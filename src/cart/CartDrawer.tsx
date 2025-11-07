import { useEffect } from "react"
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

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart()
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
            <button className="btn primary" disabled={items.length === 0}>
              Checkout
            </button>
          </div>
        </footer>
      </aside>
    </div>
  )
}
