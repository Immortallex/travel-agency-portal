import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db'; // This matches the filename above
import User from '@/models/User';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, email, password } = await req.json();

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) return NextResponse.json({ error: "Email already registered" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      fullName: name, 
      email: email.toLowerCase(), 
      password: hashedPassword 
    });

    // Welcome Email Logic
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { 
        user: 'your-email@gmail.com', // Replace with your Gmail
        pass: process.env.EMAIL_SERVER_PASSWORD 
      }
    });

    await transporter.sendMail({
      from: '"FlyPath Travels" <info@flypathtravels.com>',
      to: email,
      subject: "Welcome to FlyPath Travels",
      html: `
        <div style="font-family: Arial; padding: 20px; color: #0A192F;">
          <h1>Welcome to the Elite Path, ${name}!</h1>
          <p>Your account has been successfully created. You now have access to our specialized relocation pathways.</p>
          <p>Log in to your dashboard to begin your application.</p>
          <br/>
          <p>Best Regards,<br/><strong>FlyPath Team</strong></p>
        </div>
      `
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Signup Failed" }, { status: 500 });
  }
}