import { CartProvider, useCart } from "../cart/CartContext"
import CartDrawer from "../cart/CartDrawer"
import ShopItem from "../components/ShopItem"
import { useProducts } from "../data/useProducts"
import "../styles/ShopGrid.css"

function ShopGrid() {
  const { products, loading, error } = useProducts()

  return (
    <div className="page">
      {loading && <p>Loading products…</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <div className="shop-grid">
        {products.map((p) => (
          <ShopItem key={p.id} {...p} />
        ))}
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
