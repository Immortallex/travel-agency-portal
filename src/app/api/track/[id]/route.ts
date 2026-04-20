import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import mongoose from "mongoose";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // 1. Establish database connection
    await dbConnect();

    // Clean the tracking ID from params to ensure consistent matching
    const trackingId = params.id?.trim().toUpperCase();

    if (!trackingId) {
      return NextResponse.json({ error: "Tracking ID is required" }, { status: 400 });
    }

    // 2. Search for the user using the trackingId and check for paid status
    // This connects the tracking ID specifically to successful applicants
    const user = await User.findOne({ 
      trackingId: trackingId,
      paymentStatus: "paid" 
    });

    // 3. Handle cases where the ID is incorrect or payment isn't complete
    // Returns 404 to trigger the "No Application Found" UI on the frontend
    if (!user) {
      return NextResponse.json({ 
        error: "No active Application were found.",
        notFound: true 
      }, { status: 404 });
    }

    // 4. Return the official data for the tracking page
    return NextResponse.json({ 
      success: true,
      data: {
        trackingId: user.trackingId,
        fullName: user.fullName,
        email: user.email,
        paymentStatus: user.paymentStatus,
        createdAt: user.createdAt,
      }
    }, { status: 200 });

  } catch (error: any) {
    // 5. Error Logging for Vercel
    console.error("TRACKING_API_ERROR:", error.message);
    
    // Specifically catch format errors to prevent generic 500 crashes
    if (error instanceof mongoose.Error.CastError) {
        return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}