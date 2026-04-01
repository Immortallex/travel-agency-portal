"use server";

export async function createCryptoInvoice(applicationId: string) {
  const response = await fetch("https://nowpayments.io", {
    method: "POST",
    headers: {
      "x-api-key": process.env.NOWPAYMENTS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Update price_amount to 69.99
      price_amount: 69.99, 
      price_currency: "usd",
      order_id: applicationId,
      // Ensure these point to your new .com domain
      ipn_callback_url: "https://flypathtravels.com", 
      success_url: "https://flypathtravels.com",
      cancel_url: "https://flypathtravels.com",
    }),
  });

  const data = await response.json();
  return data.invoice_url; 
}
