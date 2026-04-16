import { NextResponse } from 'next/server';
import { Resend } from 'resend'; // Or your preferred email service

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Check if the payment is finished/confirmed
    if (body.payment_status === 'finished' || body.payment_status === 'confirmed') {
      const applicationId = body.order_id;
      
      // 1. Generate a Unique Tracking ID
      const trackingId = `FLY-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

      // 2. Update your database with the Tracking ID and 'Paid' status
      // await db.application.update({ where: { id: applicationId }, data: { status: 'paid', trackingId } });

      // 3. Send the Email Receipt
      await resend.emails.send({
        from: 'updates@flypathtravels.com',
        to: body.customer_email || 'user@example.com', // Body usually contains customer info
        subject: `Payment Successful - Tracking ID: ${trackingId}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
            <h2 style="color: #2563eb;">Payment Received</h2>
            <p>Your application for relocation has been successfully funded.</p>
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
              <p><strong>Tracking ID:</strong> ${trackingId}</p>
              <p><strong>Amount Paid:</strong> $69.99</p>
            </div>
            <p style="margin-top: 20px;">Use this ID to check your status in your profile dashboard.</p>
          </div>
        `
      });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }
}ECHO is on.
