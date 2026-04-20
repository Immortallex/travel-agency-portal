import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import mongoose from "mongoose";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // 1. Establish database connection
    await dbConnect();

    // CRITICAL UPDATE: Extract the ID correctly from params
    // We trim and uppercase to ensure the search is case-insensitive
    const { id } = await params; 
    const trackingId = id?.trim().toUpperCase();

    // This block was returning 400 because trackingId was undefined
    if (!trackingId) {
      return NextResponse.json({ error: "Tracking ID is required" }, { status: 400 });
    }

    // 2. Search for the user using the trackingId and check for paid status
    const user = await User.findOne({ 
      trackingId: trackingId,
      status: "paid" 
    });

    // 3. Handle cases where the info is wrong
    // Returning 404 allows the frontend to show the specific "No active Application" UI
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
        status: user.status,
        createdAt: user.createdAt,
      }
    }, { status: 200 });

  } catch (error: any) {
    // 5. Error Logging for Vercel
    console.error("TRACKING_API_ERROR:", error.message);
    
    if (error instanceof mongoose.Error.CastError) {
        return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}