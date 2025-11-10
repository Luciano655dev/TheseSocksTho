import { useMemo, useState } from "react"
import { CartProvider, useCart } from "../cart/CartContext"
import CartDrawer from "../cart/CartDrawer"
import ShopItem from "../components/ShopItem"
import { useProducts } from "../data/useProducts"
import "../styles/ShopGrid.css"

function Filters({
  query,
  setQuery,
  tags,
  activeTag,
  setActiveTag,
}: {
  query: string
  setQuery: (v: string) => void
  tags: string[]
  activeTag: string
  setActiveTag: (v: string) => void
}) {
  return (
    <>
      <div className="shop-hero">
        <div className="hero-inner">
          <h1>TheseSocksTho</h1>
          <p>Comfy. Durable. A little too drippy.</p>

          <div className="search-wrap">
            <input
              type="text"
              placeholder="Search socks…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search products"
            />
          </div>

          <div className="chips" role="tablist" aria-label="Filter by tag">
            {["All", ...tags].map((t) => (
              <button
                key={t}
                className={`chip ${activeTag === t ? "active" : ""}`}
                onClick={() => setActiveTag(t)}
                role="tab"
                aria-selected={activeTag === t}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function ShopGrid() {
  const { products, loading, error } = useProducts()
  const [query, setQuery] = useState("")
  const allTags = useMemo(
    () =>
      Array.from(
        new Set(products.flatMap((p: any) => p.tags || []).filter(Boolean))
      ),
    [products]
  )
  const [activeTag, setActiveTag] = useState<string>("All")

  const visibleProducts = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter((p: any) => {
      const matchesQ =
        !q ||
        p.title?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      const matchesTag =
        activeTag === "All" ||
        (p.tags || [])
          .map((t: string) => t.toLowerCase())
          .includes(activeTag.toLowerCase())
      return matchesQ && matchesTag
    })
  }, [products, query, activeTag])

  return (
    <div className="page">
      <Filters
        query={query}
        setQuery={setQuery}
        tags={allTags}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
      />

      {loading && <p className="muted center">Loading products…</p>}
      {error && <p className="error center">{String(error)}</p>}

      <div className="results-bar">
        <span className="muted">
          {visibleProducts.length} result
          {visibleProducts.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="shop-grid">
        {visibleProducts.map((p: any) => (
          <ShopItem key={p.id} {...p} />
        ))}

        {!loading && visibleProducts.length === 0 && (
          <div className="empty">
            <div className="empty-box">
              <div className="empty-emoji">🧦</div>
              <h3>No matches</h3>
              <p className="muted">Try a different search or clear filters.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function CartButton() {
  const { totalQty, toggleOpen } = useCart()
  return (
    <button className="fab" onClick={toggleOpen} aria-label="Open cart">
      <span className="fab-badge">{totalQty}</span>
      <span className="fab-label">Cart</span>
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
