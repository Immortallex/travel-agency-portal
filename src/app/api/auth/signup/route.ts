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
    if (existingUser) return NextResponse.json({ error: "User already exists" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName: name, email: email.toLowerCase(), password: hashedPassword });

    // --- INSTANT WELCOME EMAIL ---
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: 'your-email@gmail.com', pass: process.env.EMAIL_SERVER_PASSWORD }
    });

    await transporter.sendMail({
      from: '"FlyPath Travels" <info@flypathtravels.com>',
      to: email,
      subject: "Welcome to FlyPath Travels",
      html: `<h1>Welcome, ${name}!</h1><p>Your account is active. You can now apply for global relocation.</p>`
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Signup Failed" }, { status: 500 });
  }
}