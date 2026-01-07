import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Url from "@/lib/models/urls";

export const POST = async (req: Request) => {
  try {
    await dbConnect();
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }
    const shortUrl = await Url.create({ url });
    return NextResponse.json({ shortUrl }, { status: 200 });
  } catch (error) {
    console.error("Error shortening URL:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    await dbConnect();
    const urls = await Url.find();
    return NextResponse.json({ urls }, { status: 200 });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
