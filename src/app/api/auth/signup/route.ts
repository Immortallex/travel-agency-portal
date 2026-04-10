// src/app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db'; //
import User from '@/models/User';
import { sendWelcomeEmail } from '@/lib/emailService';

export async function POST(req: Request) {
  try {
    await dbConnect(); //
    const { name, email, password } = await req.json(); //

    // 1. Validation
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // 2. Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() }); //
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists." }, { status: 400 });
    }

    // 3. Create User with hashed password
    const hashedPassword = await bcrypt.hash(password, 10); //
    const user = await User.create({ 
      fullName: name, 
      email: email.toLowerCase(), 
      password: hashedPassword 
    });

    // 4. Send Welcome Email (Uses your original design logic)
    // Non-blocking call so signup feels fast
    sendWelcomeEmail(user.email, user.fullName);

    return NextResponse.json({ 
      success: true, 
      user: { id: user._id, name: user.fullName, email: user.email } 
    }, { status: 201 });

  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Signup Failed. Please try again." }, { status: 500 });
  }
}