import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Application from '@/models/Application';
import { uploadToS3 } from '@/lib/s3';

export async function POST(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();
    
    const passportFile = formData.get("passport") as File;
    const userId = formData.get("userId");
    const applicationData = JSON.parse(formData.get("formData") as string);

    if (!userId || userId === "undefined") {
      return NextResponse.json({ error: "No valid User ID found. Please re-login." }, { status: 401 });
    }

    // Upload to S3
    const passportUrl = await uploadToS3(passportFile);

    // Save to Database
    const newApp = await Application.create({
      userId,
      category: applicationData.category,
      status: 'pending_payment',
      passportUrl,
      details: applicationData,
      applicationId: `FP-${Math.floor(1000 + Math.random() * 9000)}`
    });

    return NextResponse.json({ success: true, applicationId: newApp.applicationId });

  } catch (error: any) {
    console.error("SUBMIT_ERROR:", error);
    return NextResponse.json({ error: "Server Error: check Environment Variables" }, { status: 500 });
  }
}