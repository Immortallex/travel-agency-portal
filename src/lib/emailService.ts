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
// src/lib/emailService.ts
// ... (transporter config)

export async function sendWelcomeEmail(userEmail: string, userName: string) {
  const verificationLink = "https://www.flypathtravels.com/auth"; 
  
  try {
    await transporter.sendMail({
      from: '"FlyPath Travels" <info@flypathtravels.com>',
      to: userEmail,
      subject: "Verify Your FlyPath Travels Account",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
          <h2 style="color: #0A192F;">Welcome to FlyPath, ${userName}!</h2>
          <p>Please click the button below to verify your account and access your relocation dashboard.</p>
          <a href="${verificationLink}" style="background: #2563eb; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; display: inline-block;">Verify Account</a>
        </div>
      `
    });
  } catch (error) {
    console.error("Email failed:", error);
  }
}

/**
 * Sends a professional confirmation email with an attached PDF receipt.
 */
export async function sendConfirmationEmail(userEmail: string, trackingId: string) {
  try {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(10, 25, 47);
    doc.text("FlyPath Travels", 20, 30);
    
    doc.setFontSize(14);
    doc.text(`Tracking ID: ${trackingId}`, 20, 60);
    doc.text(`Amount Paid: $69.99 (Crypto)`, 20, 70);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 80);
    
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

    await transporter.sendMail({
      from: '"FlyPath Travels" <info@flypathtravels.com>',
      to: userEmail,
      subject: `Application Successful - ${trackingId}`,
      text: `Congratulations! Your application has been received. Your unique tracking ID is ${trackingId}.`,
      attachments: [{ filename: `FlyPath_Receipt_${trackingId}.pdf`, content: pdfBuffer }],
    });

    return { success: true };
  } catch (error) {
    console.error("❌ Confirmation Email Error:", error);
    throw new Error("Failed to send confirmation email.");
  }
}