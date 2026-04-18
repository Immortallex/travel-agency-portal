import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { Resend } from 'resend';

// Initialize Resend with your API Key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // 1. Establish database connection
    await dbConnect();

    // 2. Parse the email from the request body
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 3. Find the user in the database
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    // 4. Security Best Practice: Even if the user doesn't exist, return a 200 status 
    // to prevent "Email Enumeration" (telling hackers which emails are registered).
    if (!user) {
      return NextResponse.json(
        { message: "If an account exists with this email, a reset link has been sent." },
        { status: 200 }
      );
    }

    // 5. Generate a secure random reset token and set expiration (1 hour)
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // 6. Save the token and expiry to the User document
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // 7. Construct the Reset URL pointing to your frontend/page.tsx]
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password/${resetToken}`;
    
    // 8. Send the email via Resend
    const { data, error } = await resend.emails.send({
      from: 'FlyPath Travels <info@flypathtravels.com>',
      to: email,
      subject: 'Reset Your FlyPath Travels Password',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #2563eb;">FlyPath Travels</h2>
          <p>You requested a password reset. Click the button below to set a new password. This link is valid for <strong>1 hour</strong>.</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0;">Reset Password</a>
          <p style="color: #666; font-size: 12px;">If you did not request this, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #999; font-size: 10px; text-align: center;">© 2026 FlyPath Travels</p>
        </div>
      `
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ 
      message: "If an account exists with this email, a reset link has been sent." 
    }, { status: 200 });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}