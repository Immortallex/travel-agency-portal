import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { sendTelegramNotification } from "@/lib/telegram";
import dbConnect from "@/lib/db";
import User from "@/models/User";

// Initializing Resend with your Vercel Environment Variable
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // 1. Parse the incoming notification from NOWPayments
    const body = await req.json();
    
    // Log the incoming status for debugging in Vercel Logs
    console.log("Payment Status Received:", body.payment_status);

    // 2. Filter for successful payment statuses
    if (body.payment_status === 'finished' || body.payment_status === 'confirmed') {
      
      // 3. Generate the Unique Tracking ID
      // Format: FLY - [5 Random Alphanumeric Characters]
      const trackingId = `FLY-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

      // NEW: Save the Tracking ID to the Database
      await dbConnect();
      await User.findOneAndUpdate(
        { email: body.customer_email }, 
        { $set: { trackingId: trackingId, paymentStatus: 'paid' } }
      );

      // NEW: Telegram Notification for Successful Transaction
      await sendTelegramNotification(`
<b>✅ Successful Transaction Initiated</b>
<b>User:</b> ${body.customer_email || 'Unknown'}
<b>Tracking ID:</b> ${trackingId}
<b>Status:</b> ${body.payment_status}
      `);

      // 4. Sending Email via Resend
      const { data, error } = await resend.emails.send({
        from: 'FlyPath Travels <no-reply@flypathtravels.com>',
        to: body.customer_email || 'applicant@email.com', 
        subject: `Payment Successful - Tracking ID: ${trackingId}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff;">
            <div style="background-color: #1e40af; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 2px;">FlyPath Travels</h1>
            </div>
            <div style="padding: 40px; color: #1e293b;">
              <h2 style="font-size: 20px; color: #0f172a;">Application Fee Confirmed</h2>
              <p style="line-height: 1.6;">Thank you for your payment of <strong>$69.99</strong>. Your application for relocation has been successfully submitted to our processing queue.</p>
              
              <div style="margin: 30px 0; padding: 25px; background-color: #f8fafc; border: 2px dashed #3b82f6; border-radius: 12px; text-align: center;">
                <p style="margin: 0; color: #64748b; font-size: 12px; font-weight: bold; text-transform: uppercase;">Your Unique Tracking ID</p>
                <h1 style="margin: 10px 0; font-size: 32px; color: #1e40af; font-family: monospace; letter-spacing: 4px;">${trackingId}</h1>
              </div>

              <p style="font-size: 14px; color: #475569;">Please retain this ID. You will be required to provide it during your eligibility interview and when tracking your visa status on our portal.</p>
              
              <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 30px 0;" />
              
              <p style="font-size: 12px; color: #94a3b8; text-align: center; font-style: italic;">
                This is an automated receipt. Replies to this email address are not monitored.
              </p>
            </div>
            <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 11px; color: #64748b;">
              © 2026 FlyPath Travels Global. All Rights Reserved.
            </div>
          </div>
        `
      });

      if (error) {
        console.error("Resend Error:", error);
      } else {
        console.log("Email sent successfully:", data?.id);
      }
    } 
    // NEW: Handle Abandoned or Failed Transactions
    else if (body.payment_status === 'failed' || body.payment_status === 'expired') {
      await sendTelegramNotification(`
<b>⚠️ Abandoned Transaction</b>
<b>User:</b> ${body.customer_email || 'Unknown'}
<b>Status:</b> ${body.payment_status}
<b>Reason:</b> Payment not completed by user
      `);
    }

    // Always return a 200 to NOWPayments so they stop retrying
    return NextResponse.json({ status: 'success' }, { status: 200 });

  } catch (err) {
    // NEW: Notify Telegram for system-level abandoned errors
    await sendTelegramNotification(`
<b>⚠️ Abandoned Transaction</b>
<b>System Error:</b> Webhook processing failed
    `);

    console.error('Webhook processing failed:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}