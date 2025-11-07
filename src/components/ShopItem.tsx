import { useEffect, useState } from "react"
import { useCart } from "../cart/CartContext"
import type { Product } from "../types"
import "./ShopItem.css"

type Props = Product

export default function ShopItem({
  id,
  image,
  title,
  price,
  description,
  max_qnt,
}: Props) {
  const [open, setOpen] = useState(false)
  const { addToCart, openCart } = useCart()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  const product: Product = { id, title, price, image, description, max_qnt }

  return (
    <>
      <div
        className="shop-item"
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`Open ${title}`}
      >
        <div className="shop-item-image">
          <img src={image} alt={title} />
        </div>
        <div className="shop-item-info">
          <h3 className="shop-item-title">{title}</h3>
          <p className="shop-item-price">${price}</p>
        </div>
      </div>

      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="modal-media">
              <img src={image} alt={title} />
            </div>

            <div className="modal-content">
              <h2 className="modal-title">{title}</h2>
              <p className="modal-price">${price}</p>
              {description && <p className="modal-desc">{description}</p>}

              <div className="modal-actions">
                <button
                  className="btn primary"
                  onClick={() => {
                    addToCart(product)
                    openCart()
                  }}
                >
                  Add to cart
                </button>
                <button className="btn" onClick={() => setOpen(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
