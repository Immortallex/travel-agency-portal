import db from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await db();
    const { email, password } = await req.json();

    // 1. Find user (lowercase email for safety)
    const user = await User.findOne({ email: email.toLowerCase() });

    // 2. Force Check for Credentials
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { error: "Incorrect credentials. Please check your email and password." }, 
        { status: 401 }
      );
    }

    // 3. Success
    return NextResponse.json({ 
      user: { id: user._id, fullName: user.fullName, email: user.email } 
    });

  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}