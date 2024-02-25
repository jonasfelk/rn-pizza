import { useCart } from '@/providers/CartProvider'
import { useEffect, useState } from 'react'

export const useQuantityCart = () => {
  const { items } = useCart()
  const [totalQuantity, setTotalQuantity] = useState(0)
  useEffect(() => {
    setTotalQuantity(items.reduce((total, item) => total + item.quantity, 0))
  }, [items])
  return { totalQuantity, setTotalQuantity }
}
