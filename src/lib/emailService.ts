// src/lib/emailService.ts
import nodemailer from 'nodemailer';
import { jsPDF } from 'jspdf';

// Shared transporter using your Vercel Environment Variables
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "flypathserver@gmail.com",
    pass: process.env.EMAIL_SERVER_PASSWORD, 
  },
});

/**
 * Sends a welcome email to new users upon successful signup.
 */
export async function sendWelcomeEmail(userEmail: string, userName: string) {
  try {
    await transporter.sendMail({
      from: '"FlyPath Travels" <info@flypathtravels.com>',
      to: userEmail,
      subject: "Welcome to FlyPath Travels - Account Confirmed",
      html: `<h1>Welcome, ${userName}!</h1><p>Your account is active. You can now choose your relocation pathway and start your application.</p>`
    });
    console.log(`✅ Welcome email sent to ${userEmail}`);
  } catch (error) {
    // Log error but don't crash the signup process
    console.error("❌ Welcome Email Error:", error);
  }
}

/**
 * Sends a professional confirmation email with an attached PDF receipt.
 */
export async function sendConfirmationEmail(userEmail: string, uniqueId: string) {
  try {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(10, 25, 47);
    doc.text("FlyPath Travels", 20, 30);
    
    doc.setFontSize(14);
    doc.text(`Tracking ID: ${uniqueId}`, 20, 60);
    doc.text(`Amount Paid: $69.99 (Crypto)`, 20, 70);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 80);
    
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

    await transporter.sendMail({
      from: '"FlyPath Travels" <info@flypathtravels.com>',
      to: userEmail,
      subject: `Application Successful - ${uniqueId}`,
      text: `Congratulations! Your application has been received. Your unique tracking ID is ${uniqueId}.`,
      attachments: [{ filename: `FlyPath_Receipt_${uniqueId}.pdf`, content: pdfBuffer }],
    });

    return { success: true };
  } catch (error) {
    console.error("❌ Confirmation Email Error:", error);
    throw new Error("Failed to send confirmation email.");
  }
}