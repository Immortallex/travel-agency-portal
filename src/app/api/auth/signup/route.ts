import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, email, password } = await req.json();

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) return NextResponse.json({ error: "Email exists" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ fullName: name, email: email.toLowerCase(), password: hashedPassword });

    // --- PROFESSIONAL GMAIL ALIAS CONFIG ---
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { 
        user: 'YOUR_ACTUAL_GMAIL@gmail.com', // Keep your real Gmail here for login
        pass: process.env.EMAIL_SERVER_PASSWORD // Use your 16-character App Password
      }
    });

    await transporter.sendMail({
      from: '"FlyPath Travels" <info@flypathtravels.com>', // This now works because of Step 1
      to: email,
      subject: "Welcome to FlyPath Travels",
      html: `
        <div style="font-family: sans-serif; color: #0A192F; padding: 40px; background-color: #f8fafc;">
          <div style="background-color: white; padding: 40px; border-radius: 20px; border: 1px solid #e2e8f0;">
            <h1 style="text-transform: uppercase; letter-spacing: -1px; margin-bottom: 20px;">Welcome, ${name}!</h1>
            <p style="font-size: 16px; line-height: 1.6; color: #475569;">
              Your professional relocation journey with <strong>FlyPath Travels</strong> begins now. 
              Your account is active and you can now apply for global relocation.
            </p>
            <p style="margin-top: 30px; font-weight: bold; color: #3b82f6;">FlyPath Admin Team</p>
          </div>
        </div>
      `
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Signup Failed" }, { status: 500 });
  }
}