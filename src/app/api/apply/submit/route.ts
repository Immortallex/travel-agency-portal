import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Application from '@/models/Application';
import { uploadToS3 } from '@/lib/s3';

export async function POST(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();
    
    const passportFile = formData.get("passport") as File;
    const cvFile = formData.get("cv") as File;
    const userId = formData.get("userId") as string;
    const details = JSON.parse(formData.get("formData") as string);

    // 1. Upload Files to S3
    const passportUrl = await uploadToS3(passportFile);
    const cvUrl = await uploadToS3(cvFile);

    // 2. Generate Application IDs
    const uniqueId = `FP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // 3. Create Document (Matches Schema Exactly)
    const newApp = await Application.create({
      userId,
      category: details.category || 'Tech',
      uniqueId: uniqueId,
      status: 'Pending',
      paymentStatus: 'Unpaid',
      details: details,
      passportUrl: passportUrl,
      cvUrl: cvUrl
    });

    return NextResponse.json({ 
      success: true, 
      applicationId: uniqueId 
    });

  } catch (error: any) {
    console.error("SUBMIT_ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}