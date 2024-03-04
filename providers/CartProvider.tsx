import { useInsertOrderItems } from '@/api/order-items'
import { useInsertOrder } from '@/api/orders'
import { CartItem, Product, Tables } from '@/types'
import { randomUUID } from 'expo-crypto'
import { useRouter } from 'expo-router'
import { PropsWithChildren, createContext, useContext, useState } from 'react'

type CartType = {
  items: CartItem[]
  addItem: (product: Product, size: CartItem['size']) => void
  updateQuantity: (itemId: string, quantity: 1 | -1) => void
  total: number
  checkout: () => void
}

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
})

export default function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([])
  const router = useRouter()
  const { mutate: insertOrder } = useInsertOrder()
  const { mutate: insertOrderItems } = useInsertOrderItems()
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

  const total = Number(
    items
      .reduce((total, item) => total + item.product.price * item.quantity, 0)
      .toFixed(2)
  )
  const clearCart = () => setItems([])
  const checkout = () => {
    insertOrder(
      { total },
      {
        onSuccess: (order) => {
          if (!order) return
          saveOrderItems(order)
        },
      }
    )
  }

  const saveOrderItems = (order: Tables<'orders'>) => {
    if (!order) return
    const orderItems = items.map((cartItem) => ({
      order_id: order.id,
      product_id: cartItem.product_id,
      quantity: cartItem.quantity,
      size: cartItem.size,
    }))
    insertOrderItems(orderItems, {
      onSuccess: () => {
        clearCart()
        router.navigate(`/(user)/orders/${order?.id}`)
      },
    })
  }
  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
