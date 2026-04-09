import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dbConnect from "@/lib/db";
import Application from "@/models/Application";
import { generateFlyPathID } from "@/lib/utils";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const formData = await req.formData();
    
    // Extract files and data
    const passport = formData.get("passport") as File;
    const cv = formData.get("cv") as File;
    const userId = formData.get("userId"); // From Auth session
    const sportData = JSON.parse(formData.get("sportData") as string);

    // Upload to S3 helper
    const uploadToS3 = async (file: File, folder: string) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const key = `${folder}/${Date.now()}-${file.name}`;
      await s3.send(new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      }));
      return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}://{key}`;
    };

    const passportUrl = await uploadToS3(passport, "passports");
    const cvUrl = await uploadToS3(cv, "cvs");

    // Save to MongoDB
    const newApplication = await Application.create({
      userId,
      category: "Sports",
      uniqueId: generateFlyPathID(),
      sportType: sportData.sportType,
      stats: sportData.stats,
      passportUrl,
      cvUrl,
    });

    return NextResponse.json({ success: true, applicationId: newApplication._id });
  } catch (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
