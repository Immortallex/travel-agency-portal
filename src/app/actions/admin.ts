"use server";
import dbConnect from "../../../lib/db"; // Using a direct relative path is safer
import Application from "../../models/Application";
import User from "../../models/User";
import nodemailer from 'nodemailer';

export async function approveApplication(appId: string) {
  await dbConnect();

  const app = await Application.findByIdAndUpdate(appId, { status: "Visa Process Started" });
  const user = await User.findById(app.userId);

  // Email Config
  const transporter = nodemailer.createTransport({
    host: "://flypathtravels.com",
    port: 465,
    secure: true,
    auth: { user: "info@flypathtravels.com", pass: process.env.EMAIL_SERVER_PASSWORD }
  });

  await transporter.sendMail({
    from: '"FlyPath Travels" <info@flypathtravels.com>',
    to: user.email,
    subject: "Update: Visa Process Started",
    html: `
      <div style="font-family: Arial; padding: 20px;">
        <h2>Congratulations ${user.fullName},</h2>
        <p>Your application <strong>${app.trackingId}</strong> has been approved.</p>
        <p>Our legal team has officially started your visa sponsorship process. 
           Please monitor your portal for next steps.</p>
        <p>Best Regards,<br/>FlyPath Admin Team</p>
      </div>
    `
  });

  return { success: true };
}
