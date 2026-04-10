// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db'; //
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    await dbConnect(); //
    const { email, password } = await req.json(); //

    // Find the user
    const user = await User.findOne({ email: email.toLowerCase() }); //
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    // Return user data (excluding password) to persist the session
    return NextResponse.json({
      success: true,
      user: { id: user._id, name: user.fullName, email: user.email }
    }, { status: 200 });

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}