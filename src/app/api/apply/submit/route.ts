import { NextRequest, NextResponse } from "next/server";
import { uploadToS3 } from "@/lib/s3";
import Application from "@/models/Application";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    await db();
    const data = await req.formData();
    const passportFile = data.get("passport") as File | null;
    const userId = data.get("userId");
    const detailsRaw = data.get("formData");

    if (!passportFile || !userId || !detailsRaw) {
      return NextResponse.json({ error: "Required data missing" }, { status: 400 });
    }

    const details = JSON.parse(detailsRaw as string);

    // Securely process the file
    let passportUrl = "";
    if (passportFile && typeof passportFile.arrayBuffer === 'function') {
      const buffer = Buffer.from(await passportFile.arrayBuffer());
      passportUrl = await uploadToS3(buffer, passportFile.name);
    }

    const uniqueId = `FP-${new Date().getFullYear()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

    const newApp = await Application.create({
      userId,
      category: details.category,
      uniqueId,
      details,
      passportUrl,
      cvUrl: "", // Now strictly optional
    });

    return NextResponse.json({ success: true, applicationId: newApp._id });
  } catch (error: any) {
    console.error("SUBMIT_ERROR:", error);
    return NextResponse.json({ error: "Database save failed. Ensure Application.ts is updated." }, { status: 500 });
  }
}