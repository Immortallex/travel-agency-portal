"use server";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession(applicationId: string) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: 'FlyPath Travel Application Fee' },
        unit_amount: 5000, // $50.00
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?id=${applicationId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/apply/sports`,
    metadata: { applicationId }, // Critical for tracking back after payment
  });

  return { url: session.url };
}
