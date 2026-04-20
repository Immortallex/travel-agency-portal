import { NextResponse } from 'next/server';
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ 
      user: {
        fullName: user.fullName,
        email: user.email,
        paymentStatus: user.paymentStatus,
        trackingId: user.trackingId
      } 
    });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}