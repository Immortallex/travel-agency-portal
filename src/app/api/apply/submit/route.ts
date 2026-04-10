import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Application from "@/models/Application";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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
    const data = await req.formData();
    const userId = data.get("userId");
    const passportFile = data.get("passport") as File;
    const formDetails = JSON.parse(data.get("formData") as string);

    const buffer = Buffer.from(await passportFile.arrayBuffer());
    const fileKey = `passports/${Date.now()}-${passportFile.name.replace(/\s+/g, '-')}`;
    
    await s3.send(new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileKey,
      Body: buffer,
      ContentType: passportFile.type,
    }));

    const passportUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

    const newApp = await Application.create({
      userId,
      category: formDetails.category,
      passportUrl,
      details: formDetails,
      status: "pending_payment",
      uniqueId: `FP-${Math.floor(1000 + Math.random() * 9000)}`
    });

    return NextResponse.json({ applicationId: newApp._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process application" }, { status: 500 });
  }
}