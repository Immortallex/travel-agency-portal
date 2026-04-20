// src/app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db'; //
import User from '@/models/User';
import { sendWelcomeEmail } from '@/lib/emailService';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { fullName, email, password } = await req.json();

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) return NextResponse.json({ error: "Email exists" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      fullName: fullName, 
      email: email.toLowerCase(), 
      password: hashedPassword 
    });

    // Send email with a "Get Started" link
    // This acts as your confirmation/verification trigger
    await sendWelcomeEmail(user.email, user.fullName);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Signup Failed" }, { status: 500 });
  }
}