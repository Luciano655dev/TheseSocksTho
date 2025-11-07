import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react"
import type { CartItem, Product } from "../types"

type CartState = {
  items: CartItem[]
  open: boolean
}

type CartAction =
  | { type: "HYDRATE"; payload: CartState | null }
  | { type: "TOGGLE_OPEN" }
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "ADD"; payload: Product }
  | { type: "INCREMENT"; id: string }
  | { type: "DECREMENT"; id: string }
  | { type: "REMOVE"; id: string }
  | { type: "CLEAR" }

const initialState: CartState = { items: [], open: false }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return action.payload ?? state
    case "TOGGLE_OPEN":
      return { ...state, open: !state.open }
    case "OPEN":
      return { ...state, open: true }
    case "CLOSE":
      return { ...state, open: false }
    case "ADD": {
      const { id, title, price, image, max_qnt } = action.payload
      const limit = Number.isFinite(max_qnt) ? max_qnt : Infinity

      const existing = state.items.find((i) => i.id === id)
      if (existing) {
        // already at limit? do nothing
        if (existing.qty >= (existing.max_qnt ?? limit)) return state

        const items = state.items.map((i) =>
          i.id === id
            ? { ...i, qty: Math.min(i.qty + 1, i.max_qnt ?? limit) }
            : i
        )
        return { ...state, items }
      } else {
        // add first unit (respect limit; if limit < 1, don't add)
        if (limit < 1) return state
        const newItem: CartItem = {
          id,
          title,
          price,
          image,
          qty: 1,
          max_qnt: limit,
        }
        return { ...state, items: [...state.items, newItem] }
      }
    }

    case "INCREMENT": {
      const items = state.items.map((i) => {
        if (i.id !== action.id) return i
        const limit = i.max_qnt ?? Infinity
        if (i.qty >= limit) return i // block increment
        return { ...i, qty: Math.min(i.qty + 1, limit) }
      })
      return { ...state, items }
    }

    // DECREMENT / REMOVE unchanged
    case "DECREMENT": {
      const items = state.items
        .map((i) =>
          i.id === action.id ? { ...i, qty: Math.max(0, i.qty - 1) } : i
        )
        .filter((i) => i.qty > 0)
      return { ...state, items }
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) }
    case "CLEAR":
      return { ...state, items: [] }
    default:
      return state
  }
}

type CartContextValue = {
  items: CartItem[]
  open: boolean
  totalQty: number
  subtotal: number
  toggleOpen: () => void
  openCart: () => void
  closeCart: () => void
  addToCart: (product: Product) => void
  increment: (id: string) => void
  decrement: (id: string) => void
  remove: (id: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart-state-v1")
      if (raw) {
        dispatch({ type: "HYDRATE", payload: JSON.parse(raw) })
      }
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("cart-state-v1", JSON.stringify(state))
    } catch {
      // ignore
    }
  }, [state])

  const totalQty = useMemo(
    () => state.items.reduce((s, i) => s + i.qty, 0),
    [state.items]
  )
  const subtotal = useMemo(
    () => state.items.reduce((s, i) => s + i.price * i.qty, 0),
    [state.items]
  )

  const value: CartContextValue = {
    items: state.items,
    open: state.open,
    totalQty,
    subtotal,
    toggleOpen: () => dispatch({ type: "TOGGLE_OPEN" }),
    openCart: () => dispatch({ type: "OPEN" }),
    closeCart: () => dispatch({ type: "CLOSE" }),
    addToCart: (product) => dispatch({ type: "ADD", payload: product }),
    increment: (id) => dispatch({ type: "INCREMENT", id }),
    decrement: (id) => dispatch({ type: "DECREMENT", id }),
    remove: (id) => dispatch({ type: "REMOVE", id }),
    clear: () => dispatch({ type: "CLEAR" }),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}
