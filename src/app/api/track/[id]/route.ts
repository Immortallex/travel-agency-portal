import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Application from "@/models/Application";
import mongoose from "mongoose";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // 1. Establish database connection with a timeout check
    await dbConnect();

    const trackingId = params.id?.toUpperCase();

    if (!trackingId) {
      return NextResponse.json({ error: "Tracking ID is required" }, { status: 400 });
    }

    // 2. Search for the application
    // We filter by uniqueId and ensure the paymentStatus is 'paid' 
    const application = await Application.findOne({ 
      uniqueId: trackingId,
      paymentStatus: "paid" 
    });

    // 3. Handle cases where the ID is wrong or payment isn't complete
    if (!application) {
      return NextResponse.json({ 
        error: "No successful application found with this ID. Please ensure your payment was completed." 
      }, { status: 404 });
    }

    // 4. Return the detailed status and info
    return NextResponse.json({ 
      success: true,
      trackingId: application.uniqueId,
      fullName: application.fullName,
      status: application.status, 
      category: application.segment, // Using 'segment' from your schema
      appliedAt: application.createdAt,
      payment: application.paymentStatus 
    }, { status: 200 });

  } catch (error: any) {
    // 5. Detailed Logging (Visible in Vercel logs, not to the user)
    console.error("TRACKING_SYSTEM_ERROR:", error.message);

    // Identify specific database errors to avoid the generic "Server Error"
    if (error instanceof mongoose.Error.CastError) {
        return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    return NextResponse.json({ 
      error: "Service temporarily unavailable. Please try again later." 
    }, { status: 500 });
  }
}