import { useEffect, useState } from "react"
import { z } from "zod"
import type { Product } from "../types"

const PRODUCTS_URL =
  "https://luciano655dev.github.io/thesesockstho_data/products.json"
const CACHE_KEY = "products-cache-v1"
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

const ProductSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
  image: z.string().url(),
  max_qnt: z.number().int().nonnegative(),
  description: z.string().optional(),
  active: z.boolean().optional().default(true),
})

const ProductsSchema = z.array(ProductSchema)

type ProductsState = {
  products: Product[]
  loading: boolean
  error: string | null
}

export function useProducts(): ProductsState {
  const [state, setState] = useState<ProductsState>({
    products: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    let aborted = false

    // try cache first
    try {
      const raw = localStorage.getItem(CACHE_KEY)
      if (raw) {
        const { ts, data } = JSON.parse(raw)
        if (Date.now() - ts < CACHE_TTL) {
          const parsed = ProductsSchema.safeParse(data)
          if (parsed.success) {
            setState({
              products: parsed.data.filter((p) => p.active !== false),
              loading: false,
              error: null,
            })
          }
        }
      }
    } catch {}

    ;(async () => {
      try {
        const res = await fetch(PRODUCTS_URL, { cache: "no-cache" })
        if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`)
        const json = await res.json()
        const parsed = ProductsSchema.parse(json) // throws if invalid
        if (aborted) return

        const active = parsed.filter((p) => p.active !== false)
        setState({ products: active, loading: false, error: null })

        // save cache
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ ts: Date.now(), data: parsed })
          )
        } catch {}
      } catch (err: any) {
        if (aborted) return
        setState((s) => ({
          ...s,
          loading: false,
          error: err?.message ?? "Failed to load products",
        }))
      }
    })()

    return () => {
      aborted = true
    }
  }, [])

  return state
}
