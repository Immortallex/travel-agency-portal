import { NextResponse } from 'next/server';
import connectDB from '@/lib/db'; // Ensuring consistency with your preferred db.ts
import Application from '@/models/Application';
import { uploadToS3 } from '@/lib/s3';

export async function POST(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();
    
    const passportFile = formData.get("passport") as File;
    const cvFile = formData.get("cv") as File; // Check if CV exists
    const userId = formData.get("userId");
    const applicationData = JSON.parse(formData.get("formData") as string);

    if (!userId || userId === "undefined") {
      return NextResponse.json({ error: "Auth session expired. Please re-login." }, { status: 401 });
    }

    // 1. Upload Passport
    const passportUrl = await uploadToS3(passportFile);

    // 2. Upload CV (if provided, otherwise use a placeholder to satisfy schema)
    let cvUrl = "no-cv-provided";
    if (cvFile && cvFile.size > 0) {
      cvUrl = await uploadToS3(cvFile);
    }

    // 3. Generate the required uniqueId mentioned in your error log
    const generatedUniqueId = `FP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // 4. Save to MongoDB
    const newApp = await Application.create({
      userId,
      uniqueId: generatedUniqueId, // Fixed missing required field
      cvUrl: cvUrl,                // Fixed missing required field
      passportUrl: passportUrl,
      category: applicationData.category || 'General',
      status: 'pending_payment',
      details: applicationData,
      applicationId: `APP-${Math.floor(1000 + Math.random() * 9000)}`
    });

    return NextResponse.json({ 
      success: true, 
      applicationId: newApp.applicationId,
      mongoId: newApp._id 
    });

  } catch (error: any) {
    console.error("SUBMIT_ERROR:", error);
    return NextResponse.json({ error: error.message || "Server Error" }, { status: 500 });
  }
}