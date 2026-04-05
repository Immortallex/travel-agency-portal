import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'; // Using bcryptjs for better Vercel compatibility
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, email, password } = await req.json();

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) return NextResponse.json({ error: "User exists" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ fullName: name, email: email.toLowerCase(), password: hashedPassword });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Database Connection Failed" }, { status: 500 });
  }
}
