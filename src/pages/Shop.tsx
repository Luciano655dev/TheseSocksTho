import { useState } from "react"
import { CartProvider, useCart } from "../cart/CartContext"
import CartDrawer from "../cart/CartDrawer"
import ShopItem from "../components/ShopItem"
import { useProducts } from "../data/useProducts"
import "../styles/ShopGrid.css"

function ShopGrid() {
  const { products, loading, error } = useProducts()
  const [query, setQuery] = useState("")

  const visibleProducts = products.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="page">
      {/* ✅ Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search socks…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search products"
        />
      </div>

      {loading && <p>Loading products…</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <div className="shop-grid">
        {visibleProducts.map((p) => (
          <ShopItem key={p.id} {...p} />
        ))}

        {visibleProducts.length === 0 && !loading && (
          <p style={{ padding: "18px", textAlign: "center", color: "#555" }}>
            No products found.
          </p>
        )}
      </div>
    </div>
  )
}

function CartButton() {
  const { totalQty, toggleOpen } = useCart()
  return (
    <button
      onClick={toggleOpen}
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        borderRadius: 999,
        padding: "12px 16px",
        border: "1px solid #111",
        background: "#111",
        color: "#fff",
        fontWeight: 700,
        cursor: "pointer",
      }}
      aria-label="Open cart"
    >
      Cart ({totalQty})
    </button>
  )
}

export default function Shop() {
  return (
    <CartProvider>
      <ShopGrid />
      <CartButton />
      <CartDrawer />
    </CartProvider>
  )
}
