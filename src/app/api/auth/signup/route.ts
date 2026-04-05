import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    // 1. Connect to MongoDB
    await dbConnect();

    // 2. Parse the request body
    const { name, email, password } = await req.json();

    // 3. Validation: Ensure all fields are present
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields (Name, Email, Password) are required." },
        { status: 400 }
      );
    }

    // 4. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email already exists." },
        { status: 422 }
      );
    }

    // 5. Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 12);

    // 6. Create the user in MongoDB
    const newUser = await User.create({
      fullName: name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User created successfully!", userId: newUser._id },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}