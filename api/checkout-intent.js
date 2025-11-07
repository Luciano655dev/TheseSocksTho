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
    from: process.env.FROM_EMAIL || "TheseSocksTho <onboarding@resend.dev>",
    to: process.env.OWNER_EMAIL || customerEmail,
    subject: `New order from ${customerEmail} — $${Number(
      subtotal ?? 0
    ).toFixed(2)}`,
    html: `
  <div style="font-family: Arial, sans-serif; background:#f6f7fb; padding:24px;">
    <div style="
      max-width:600px;
      margin:0 auto;
      background:white;
      border-radius:12px;
      overflow:hidden;
      box-shadow:0 4px 12px rgba(0,0,0,0.08);
    ">

      <div style="background:#111; padding:20px; text-align:center;">
        <h1 style="color:#fff; margin:0; font-size:28px; letter-spacing:1px;">
          TheseSocksTho 🧦
        </h1>
      </div>

      <div style="padding:30px;">
        <h2 style="color:#111; margin-top:0; font-size:22px;">New Order Received</h2>

        <p style="color:#444; font-size:15px; line-height:1.5;">
          You received a new purchase from <strong>${customerEmail}</strong>.
        </p>

        <div style="
          background:#f2f3f7;
          padding:16px;
          margin:18px 0;
          border-radius:8px;
        ">
          <p style="margin:0; font-size:15px; color:#333;">
            <strong>Total:</strong> $${Number(subtotal ?? 0).toFixed(2)}
          </p>
        </div>

        <h3 style="color:#111; margin-bottom:8px; font-size:18px;">Order Details</h3>

        ${cart
          .map(
            (it) => `
            <div style="
              border-bottom:1px solid #eee;
              padding:12px 0;
              display:flex;
              justify-content:space-between;
              align-items:center;
            ">
              <div>
                <div style="font-size:15px; color:#111;"><strong>${
                  it.title
                }</strong></div>
                <div style="font-size:13px; color:#555;">
                  $${Number(it.price).toFixed(2)} × ${it.qty}
                </div>
                <div style="font-size:12px; color:#999;">ID: ${it.id}</div>
              </div>
              <div style="font-size:15px; color:#111; font-weight:bold;">
                $${(it.price * it.qty).toFixed(2)}
              </div>
            </div>
          `
          )
          .join("")}

        <div style="text-align:center; margin-top:28px;">
          <a href="https://these-socks-tho.vercel.app" style="
            background:#111;
            color:white;
            padding:12px 26px;
            border-radius:8px;
            text-decoration:none;
            font-size:15px;
          ">
            View Store
          </a>
        </div>

        <p style="color:#888; font-size:12px; text-align:center; margin-top:25px;">
          This email was automatically sent from TheseSocksTho order system.
        </p>
      </div>
    </div>
  </div>
`,
  })

  // confirmation to customer (note: in Resend sandbox, this only works if the recipient is your own email)
  await resend.emails.send({
    from: process.env.FROM_EMAIL || "Shop Bot <onboarding@resend.dev>",
    to: customerEmail,
    subject: "We received your order ✅",
    html: `
  <div style="font-family: Arial, sans-serif; background:#f6f7fb; padding:24px;">
    <div style="
      max-width:600px;
      margin:0 auto;
      background:white;
      border-radius:12px;
      box-shadow:0 4px 12px rgba(0,0,0,0.08);
      overflow:hidden;
    ">
      <div style="background:#111; padding:20px; text-align:center;">
        <h1 style="color:#fff; margin:0; font-size:28px;">TheseSocksTho 🧦</h1>
      </div>

      <div style="padding:26px;">
        <h2 style="margin:0 0 10px 0; color:#111;">Order Confirmed ✅</h2>

        <p style="color:#444; font-size:15px; line-height:1.6;">
          Thanks, ${customerEmail}! We received your order.
          You'll be notified when it ships.
        </p>

        <div style="
          background:#f2f3f7;
          padding:14px;
          margin:20px 0;
          border-radius:8px;
          font-size:15px;
          color:#333;
        ">
          <strong>Total:</strong> $${Number(subtotal ?? 0).toFixed(2)}
        </div>

        <h3 style="color:#111; margin-bottom:6px;">Items</h3>

        ${cart
          .map(
            (it) =>
              `<div style="border-bottom:1px solid #eee; padding:10px 0; font-size:15px;">
                <strong>${it.title}</strong> — $${Number(it.price).toFixed(
                2
              )} × ${it.qty}
              </div>`
          )
          .join("")}

        <p style="color:#777; font-size:12px; text-align:center; margin-top:25px;">
          If you have questions, just reply to this email.
        </p>
      </div>
    </div>
  </div>
`,
  })

  return res.status(200).json({ success: true })
}
