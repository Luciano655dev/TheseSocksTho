import { Resend } from "resend"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { customerEmail, cart, subtotal } = req.body || {}
  const validEmail =
    typeof customerEmail === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)

  if (!validEmail || !Array.isArray(cart)) {
    return res.status(400).json({ error: "Invalid payload" })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  // send to you (owner)
  await resend.emails.send({
    from: process.env.FROM_EMAIL || "Shop Bot <onboarding@resend.dev>",
    to: process.env.OWNER_EMAIL || customerEmail,
    subject: `New order from ${customerEmail} — $${Number(
      subtotal ?? 0
    ).toFixed(2)}`,
    html: `
      <h2>New order</h2>
      <p><strong>Customer:</strong> ${customerEmail}</p>
      <p><strong>Subtotal:</strong> $${Number(subtotal ?? 0).toFixed(2)}</p>
      <ul>
        ${cart
          .map(
            (it) =>
              `<li>${it.title} — $${Number(it.price).toFixed(2)} × ${
                it.qty
              } (id: ${it.id})</li>`
          )
          .join("")}
      </ul>
    `,
  })

  // confirmation to customer (note: in Resend sandbox, this only works if the recipient is your own email)
  await resend.emails.send({
    from: process.env.FROM_EMAIL || "Shop Bot <onboarding@resend.dev>",
    to: customerEmail,
    subject: "We received your order ✅",
    html: `
      <h2>Thanks for your order!</h2>
      <p>We received your purchase and will contact you soon.</p>
      <p>Total: $${Number(subtotal ?? 0).toFixed(2)}</p>
    `,
  })

  return res.status(200).json({ success: true })
}
