"use server";

export async function createCryptoInvoice(applicationId: string) {
  const response = await fetch("https://api.nowpayments.io/v1/invoice", { // Ensure URL is correct
    method: "POST",
    headers: {
      "x-api-key": process.env.NOWPAYMENTS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      price_amount: 69.99, 
      price_currency: "usd",
      order_id: applicationId,
      ipn_callback_url: "https://flypathtravels.com/api/webhook", 
      // UPDATE THIS TO THE RECEIPT PAGE
      success_url: "https://flypathtravels.com/payment-success",
      cancel_url: "https://flypathtravels.com/profile",
    }),
  });

  const data = await response.json();
  return data.invoice_url; 
}