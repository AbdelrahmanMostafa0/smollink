import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Url from "@/lib/models/urls";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ url: string }> }
) => {
  try {
    await dbConnect();
    const { url } = await params;
    const urlDoc = await Url.findOne({ shortUrl: url });
    urlDoc.clicks += 1;
    await urlDoc.save();

    if (!urlDoc) {
      return NextResponse.json({ error: "URL not found" }, { status: 404 });
    }

    return NextResponse.json(urlDoc, { status: 200 });
  } catch (error) {
    console.error("Error fetching URL:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
