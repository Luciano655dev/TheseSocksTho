import { useState, memo } from "react"

type Status = "idle" | "loading" | "success" | "error"

const NEWSLETTER_ENDPOINT = "https://formspree.io/f/mvgveekv"

function Newsletter() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!ok) {
      setStatus("error")
      setMessage("Please enter a valid email.")
      return
    }

    try {
      setStatus("loading")
      setMessage("")

      const res = await fetch(NEWSLETTER_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, source: "TheseSocksTho Website" }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()

      if (data.ok) {
        setStatus("success")
        setMessage("You're in! Check your inbox for a welcome note.")
        setEmail("")
        setName("")
      } else {
        throw new Error("Failed")
      }
    } catch {
      setStatus("error")
      setMessage("Sorry, something went wrong. Please try again.")
    }
  }

  return (
    <section className="tst-newsletter" aria-labelledby="newsletter-heading">
      <div className="tst-newsletter-inner">
        <div className="tst-newsletter-copy">
          <h2 id="newsletter-heading">Join the Drop List</h2>
          <p>
            Get early access to new designs, limited drops, and exclusive
            discounts.
          </p>
        </div>

        {status === "success" ? (
          <div className="tst-newsletter-success" role="status">
            ✅ {message}
          </div>
        ) : (
          <form className="tst-newsletter-form" onSubmit={handleSubmit}>
            <div className="tst-inputs">
              <input
                type="text"
                placeholder="First name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-label="First name"
                autoComplete="given-name"
              />
              <input
                required
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email"
                autoComplete="email"
                inputMode="email"
              />
              <button
                className="tst-btn primary"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Joining…" : "Sign Up"}
              </button>
            </div>

            {status === "error" && message && (
              <div className="tst-newsletter-error" role="alert">
                {message}
              </div>
            )}

            <p className="tst-newsletter-small">
              We’ll only email you about drops and deals. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}

export default memo(Newsletter)
