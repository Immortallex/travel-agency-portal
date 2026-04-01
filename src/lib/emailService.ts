import nodemailer from 'nodemailer';
import { jsPDF } from 'jspdf';

export async function sendConfirmationEmail(userEmail: string, uniqueId: string) {
  // 1. Generate PDF
  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.text("FlyPath Travels - Official Receipt", 20, 20);
  doc.setFontSize(12);
  doc.text(`Application ID: ${uniqueId}`, 20, 40);
  doc.text("Next Steps:", 20, 60);
  doc.text("1. Verification: We are reviewing your documents.", 20, 70);
  doc.text("2. Tracking: Monitor status at ://flypath.com", 20, 80);
  
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

  // 2. Setup Transporter (info@flypath.com placeholder)
  const transporter = nodemailer.createTransport({
    host: "://flypath.com", // You'll update this once your domain is live
    port: 465,
    secure: true,
    auth: {
      user: "info@flypath.com",
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  // 3. Send Email
  await transporter.sendMail({
    from: '"FlyPath Travels" <info@flypath.com>',
    to: userEmail,
    subject: "Application Successful - FlyPath Travels",
    text: `Your application is confirmed. Your unique tracking ID is: ${uniqueId}`,
    attachments: [{
      filename: `FlyPath_Receipt_${uniqueId}.pdf`,
      content: pdfBuffer,
    }],
  });
}
