import db from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await db();
    const { email, password } = await req.json();
    const user = await User.findOne({ email: email.toLowerCase() });

    // Force failure message if email or password is wrong
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { error: "Incorrect login credentials. Please verify your email and password." }, 
        { status: 401 }
      );
    }

    return NextResponse.json({ 
      user: { id: user._id, fullName: user.fullName, email: user.email } 
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error during login." }, { status: 500 });
  }
}