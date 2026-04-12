import { NextRequest, NextResponse } from "next/server";
import { uploadToS3 } from "@/lib/s3"; // Or your Cloudinary/Upload logic
import Application from "@/models/Application";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.formData();
    
    const passportFile = data.get("passport") as File | null;
    const cvFile = data.get("cv") as File | null; // This might be null now
    const userId = data.get("userId");
    const details = JSON.parse(data.get("formData") as string);

    if (!passportFile || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Process Passport (Required)
    const passportBuffer = Buffer.from(await passportFile.arrayBuffer());
    const passportUrl = await uploadToS3(passportBuffer, passportFile.name);

    // FIX: Process CV ONLY if it exists
    let cvUrl = "";
    if (cvFile && cvFile.size > 0) {
      const cvBuffer = Buffer.from(await cvFile.arrayBuffer());
      cvUrl = await uploadToS3(cvBuffer, cvFile.name);
    }

    // Generate unique ID
    const uniqueId = `FP-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const newApplication = await Application.create({
      userId,
      category: details.category,
      uniqueId,
      details,
      passportUrl,
      cvUrl: cvUrl || "Not Provided", // Send empty string or default if null
      status: 'Pending',
      paymentStatus: 'Unpaid'
    });

    return NextResponse.json({ 
      success: true, 
      applicationId: newApplication._id 
    });

  } catch (error: any) {
    console.error("SUBMIT_ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}