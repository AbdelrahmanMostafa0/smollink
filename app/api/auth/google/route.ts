import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import dbConnect from "@/lib/db";
import User from "@/lib/models/users";
import { generateToken } from "@/lib/jwt";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json(
        { error: "Google ID token is required" },
        { status: 400 }
      );
    }

    // Verify token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return NextResponse.json(
        { error: "Invalid Google token" },
        { status: 401 }
      );
    }

    const { email, name, picture, sub: googleId } = payload;

    await dbConnect();

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      // If user exists but registered via email, we can link or merge.
      // For now, if provider is different, we might want to update it or just log them in.
      // Simpler approach: If email matches, we allow it, maybe update googleId if missing.
      if (!user.googleId) {
        user.googleId = googleId;
        user.provider = "google"; // or keep 'email' mixed
        if (picture && !user.profilePicture) user.profilePicture = picture;
        await user.save();
      }
    } else {
      // Create new user
      user = await User.create({
        fullName: name,
        email,
        googleId,
        provider: "google",
        profilePicture: picture,
      });
    }

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      fullName: user.fullName,
    });

    return NextResponse.json(
      {
        message: "Google login successful",
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          profilePicture: user.profilePicture,
        },
        token,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Google auth error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
