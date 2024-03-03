import { CartItem, Product } from '@/types'
import { randomUUID } from 'expo-crypto'
import { PropsWithChildren, createContext, useContext, useState } from 'react'

type CartType = {
  items: CartItem[]
  addItem: (product: Product, size: CartItem['size']) => void
  updateQuantity: (itemId: string, quantity: 1 | -1) => void
  totalPrice: number
}

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  totalPrice: 0,
})

export default function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (product: Product, size: CartItem['size']) => {
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    )
    if (existingItem) {
      updateQuantity(existingItem.id, 1)
      return
    }
    const newCartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    }

    setItems([...items, newCartItem])
  }

  const updateQuantity = (itemId: string, quantity: 1 | -1) => {
    const updatedItems = items
      .map((item) =>
        item.id !== itemId
          ? item
          : { ...item, quantity: item.quantity + quantity }
      )
      .filter((item) => item.quantity > 0)

    setItems(updatedItems)
  }

  const totalPrice = Number(
    items
      .reduce((total, item) => total + item.product.price * item.quantity, 0)
      .toFixed(2)
  )
  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
