import { NextResponse } from "next/server";
import Application from "@/models/Application";
import dbConnect from "@/lib/db"; // Updated to use your lib/db
import { getServerSession } from "next-auth"; // If using NextAuth, or get user from local storage logic

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();

    // 1. Validate User ID (Your model requires this)
    // If you aren't using sessions, ensure the frontend sends 'userId' in the body
    if (!data.userId) {
      return NextResponse.json({ error: "Unauthorized: Missing User ID" }, { status: 401 });
    }

    // 2. Generate a Unique ID to prevent the E11000 "null" error
    const uniqueTrackingId = `FLY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // 3. Map frontend fields to match your Application.ts model
    const applicationData = {
      userId: data.userId,
      fullName: data.fullName,
      email: data.email,
      tel: data.tel,
      dateOfBirth: new Date(data.dateOfBirth),
      currentAddress: data.address || data.currentAddress, // Handles both naming conventions
      residenceCountry: data.country,
      destinationCountry: data.destination,
      segment: data.segment,
      uniqueId: uniqueTrackingId,
      status: "pending",
      segmentSpecificData: {
        githubProfile: data.github || "",
        techStack: data.stack || "",
        yearsExperience: data.experience_years || "",
        trade: data.trade || "",
        certification: data.cert || "",
        studyProgramme: data.intendedProgramme || "",
        fieldOfStudy: data.fieldOfStudy || "",
        maritalStatus: data.maritalStatus || "",
        dependentsList: data.dependentsList || []
      }
    };

    // 4. Create the application
    const newApp = await Application.create(applicationData);

    // 5. Return the ID that will be used by createCryptoInvoice
    return NextResponse.json({ 
      success: true, 
      id: newApp.uniqueId, // This is the ID passed to NOWPayments
      dbId: newApp._id 
    }, { status: 200 });

  } catch (error: any) {
    console.error("APPLICATION_ERROR:", error);
    
    // Check if it's still a duplicate key error
    if (error.code === 11000) {
      return NextResponse.json({ 
        error: "Duplicate submission detected. Please clear your database 'null' entries." 
      }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}