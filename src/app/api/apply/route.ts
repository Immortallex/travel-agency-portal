import { NextResponse } from "next/server";
import Application from "@/models/Application";
import dbConnect from "@/lib/db";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();

    // 1. Safety Check: Ensure User ID is present
    if (!data.userId) {
      return NextResponse.json({ error: "Unauthorized: Please log in." }, { status: 401 });
    }

    // 2. Destructure Core Fields (Needed for Schema)
    const { 
      userId, fullName, email, tel, dateOfBirth, 
      address, currentAddress, country, destination, segment, 
      ...allOtherQuestions // CAPTURES EVERYTHING ELSE AUTOMATICALLY
    } = data;

    // 3. Create unique identifier to prevent index clashes
    const uniqueId = `FLY-${Math.floor(100000 + Math.random() * 900000)}`;

    const applicationData = {
      userId,
      fullName,
      email,
      tel,
      dateOfBirth: new Date(dateOfBirth),
      currentAddress: address || currentAddress, // Fixes the "address required" error
      residenceCountry: country,
      destinationCountry: destination,
      segment: segment,
      uniqueId: uniqueId,
      // SAVES EVERY FORM QUESTION FROM ANY PAGE HERE
      segmentSpecificData: {
        ...allOtherQuestions
      },
      status: "pending"
    };

    const newApp = await Application.create(applicationData);

    return NextResponse.json({ 
      success: true, 
      id: newApp.uniqueId // Used by createCryptoInvoice
    }, { status: 200 });

  } catch (error: any) {
    console.error("UNIVERSAL_API_ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}