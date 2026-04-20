import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import mongoose from "mongoose";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // 1. Establish database connection
    await dbConnect();

    const trackingId = params.id?.toUpperCase();

    if (!trackingId) {
      return NextResponse.json({ error: "Tracking ID is required" }, { status: 400 });
    }

    // 2. Search for the user using the tracking ID and ensuring they have paid
    const user = await User.findOne({ 
      trackingId: trackingId,
      paymentStatus: "paid" 
    });

    // 3. Scenario: ID not found or application not successful
    if (!user) {
      return NextResponse.json({ 
        error: "No active Application were found.",
        actionRequired: true
      }, { status: 404 });
    }

    // 4. Scenario: ID found - Return user's official data for the PDF page
    return NextResponse.json({ 
      success: true,
      data: {
        trackingId: user.trackingId,
        fullName: user.fullName,
        email: user.email,
        paymentStatus: user.paymentStatus,
        createdAt: user.createdAt,
        // The frontend will use these to build the official data page
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error("TRACKING_SYSTEM_ERROR:", error.message);

    if (error instanceof mongoose.Error.CastError) {
        return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    return NextResponse.json({ 
      error: "Service temporarily unavailable. Please try again later." 
    }, { status: 500 });
  }
}