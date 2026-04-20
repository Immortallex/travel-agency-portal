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
    const passport = formData.get("passport") as File;
    const userId = formData.get("userId");
    const eduData = JSON.parse(formData.get("eduData") as string);

    const buffer = Buffer.from(await passport.arrayBuffer());
    const key = `passports/edu-${Date.now()}-${passport.name}`;
    
    await s3.send(new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: passport.type,
    }));

    const passportUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    const newApplication = await Application.create({
      userId,
      category: "Education",
      uniqueId: generateFlyPathID(),
      passportUrl,
      details: eduData,
      status: "Pending Payment",
    });

    return NextResponse.json({ success: true, applicationId: newApplication.uniqueId });
  } catch (error) {
    return NextResponse.json({ error: "Education submission failed" }, { status: 500 });
  }
}