import nodemailer from 'nodemailer';
import { jsPDF } from 'jspdf';

/**
 * Sends a professional confirmation email with an attached PDF receipt.
 * @param userEmail - The applicant's email address
 * @param uniqueId - The generated FP-2026-XXXX-XXXX ID
 */
export async function sendConfirmationEmail(userEmail: string, uniqueId: string) {
  try {
    // 1. Create the PDF Receipt
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(10, 25, 47); // FlyPath Navy
    doc.text("FlyPath Travels", 20, 30);
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text("Official Application Receipt", 20, 40);
    
    // Content
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Tracking ID: ${uniqueId}`, 20, 60);
    doc.text(`Amount Paid: $69.99 (Crypto)`, 20, 70);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 80);
    
    // Next Steps Section
    doc.setFontSize(16);
    doc.text("Your Next Steps:", 20, 100);
    doc.setFontSize(12);
    doc.text("1. Verification: Our team is reviewing your documents (Passport/CV).", 20, 115);
    doc.text("2. Tracking: Visit https://flypathtravels.com to check your status.", 20, 125);
    doc.text("3. Interview: If shortlisted, you will receive a virtual meeting invite.", 20, 135);
    doc.text("4. Legal: Upon approval, we initiate your visa sponsorship process.", 20, 145);
    
    // Footer
    doc.setFontSize(10);
    doc.text("Thank you for choosing FlyPath Travels.", 20, 180);
    
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

    // 2. Configure Gmail Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "flypathserver@gmail.com", // Your Gmail acting as the engine
        pass: process.env.EMAIL_SERVER_PASSWORD, // Your 16-character Google App Password
      },
    });

    // 3. Send the Email
    const mailOptions = {
      // Changed to use your professional custom domain email
      from: '"FlyPath Travels" <info@flypathtravels.com>', 
      to: userEmail,
      subject: `Application Successful - ${uniqueId}`,
      text: `Congratulations! Your application has been received. Your unique tracking ID is ${uniqueId}. Please find your receipt attached.`,
      attachments: [
        {
          filename: `FlyPath_Receipt_${uniqueId}.pdf`,
          content: pdfBuffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${userEmail}`);
    
    return { success: true };
  } catch (error) {
    console.error("❌ Email Error:", error);
    throw new Error("Failed to send confirmation email.");
  }
}