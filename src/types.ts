export type Product = {
  id: string
  title: string
  price: number
  image: string
  description?: string
  max_qnt: number
}

export type CartItem = {
  id: string
  title: string
  price: number
  image: string
  qty: number
  max_qnt?: number
}
