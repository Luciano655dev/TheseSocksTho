import { useEffect, useState } from "react"
import { useCart } from "../cart/CartContext"
import "./CartDrawer.css"

export default function CartDrawer() {
  const {
    open,
    closeCart,
    items,
    subtotal,
    increment,
    decrement,
    remove,
    clear,
  } = useCart()

  const [showCheckout, setShowCheckout] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: any) => e.key === "Escape" && closeCart()
    window.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open, closeCart])

  if (!open) return null

  return (
    <div className="cart-overlay" onClick={closeCart}>
      <aside
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
        aria-label="Shopping cart"
        role="dialog"
        aria-modal="true"
      >
        <header className="cart-header">
          <h2>Your Cart</h2>
          <button
            className="cart-close"
            onClick={closeCart}
            aria-label="Close cart"
          >
            ×
          </button>
        </header>

        <div className="cart-items">
          {items.length === 0 ? (
            <p className="cart-empty">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div className="cart-row" key={item.id}>
                <img className="cart-thumb" src={item.image} alt={item.title} />
                <div className="cart-info">
                  <div className="cart-title">{item.title}</div>
                  <div className="cart-price">${item.price.toFixed(2)}</div>
                  <div className="cart-qty">
                    <button
                      onClick={() => decrement(item.id)}
                      aria-label="Decrease"
                    >
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => increment(item.id)}
                      aria-label="Increase"
                      disabled={(item.max_qnt ?? Infinity) <= item.qty} // 👈 disable at cap
                    >
                      +
                    </button>
                  </div>

                  {Number.isFinite(item.max_qnt ?? Infinity) && (
                    <div
                      className="cart-limit-note"
                      style={{ fontSize: 12, color: "#666" }}
                    >
                      Max: {item.max_qnt}
                    </div>
                  )}
                </div>
                <div className="cart-line-total">
                  ${(item.price * item.qty).toFixed(2)}
                </div>
                <button
                  className="cart-remove"
                  onClick={() => remove(item.id)}
                  aria-label="Remove"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <footer className="cart-footer">
          <div className="cart-subtotal">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <div className="cart-actions">
            <button
              className="btn light"
              onClick={clear}
              disabled={items.length === 0}
            >
              Clear
            </button>
            <button
              className="btn primary"
              disabled={items.length === 0}
              onClick={() => setShowCheckout(true)}
            >
              Checkout
            </button>
          </div>
        </footer>
      </aside>

      {showCheckout && (
        <CheckoutModal
          onClose={() => setShowCheckout(false)}
          payload={{ items, subtotal }}
          onAfterSuccess={() => {
            // optional: clear cart & keep popup with success message visible
            clear()
          }}
        />
      )}
    </div>
  )
}
function CheckoutModal({ onClose, payload, onAfterSuccess }: any) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("form") // "form" | "sending" | "success" | "error"
  const [error, setError] = useState("")

  async function handleSubmit(e: any) {
    e.preventDefault()
    setError("")
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email.")
      return
    }
    setStatus("sending")

    try {
      const res = await fetch("/api/checkout-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail: email,
          cart: payload.items,
          subtotal: payload.subtotal,
        }),
      })

      if (!res.ok) throw new Error("Failed to send")

      setStatus("success")
      onAfterSuccess?.()
    } catch (err) {
      setStatus("error")
      setError("Could not send. Please try again.")
    }
  }

  return (
    <div
      className="cart-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="checkout-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 20,
          maxWidth: 420,
          width: "90%",
          margin: "10vh auto",
          boxShadow: "0 10px 30px rgba(0,0,0,.1)",
        }}
      >
        {status === "form" && (
          <>
            <h3 style={{ marginTop: 0 }}>Enter your email</h3>
            <p>We’ll process your purchase and send you updates.</p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{ width: "100%", padding: 10, marginBottom: 10 }}
              />
              {error && (
                <div style={{ color: "crimson", marginBottom: 8 }}>{error}</div>
              )}
              <button
                type="submit"
                className="btn primary"
                style={{ width: "100%" }}
              >
                Send Order
              </button>
              <button
                type="button"
                className="btn light"
                onClick={onClose}
                style={{ width: "100%", marginTop: 8 }}
              >
                Cancel
              </button>
            </form>
          </>
        )}

        {status === "sending" && (
          <p style={{ margin: 0 }}>Sending your order…</p>
        )}

        {status === "success" && (
          <>
            <h3 style={{ marginTop: 0 }}>You're all set 🎉</h3>
            <p>Your purchase will be processed and we will notify you!</p>
            <button
              className="btn primary"
              onClick={onClose}
              style={{ width: "100%" }}
            >
              Close
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <h3 style={{ marginTop: 0 }}>Oops</h3>
            <p>{error}</p>
            <button
              className="btn primary"
              onClick={() => setStatus("form")}
              style={{ width: "100%" }}
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  )
}
