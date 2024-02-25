import CartListItem from '@/components/CartListItem'
import { View } from '@/components/Themed'
import { useCart } from '@/providers/CartProvider'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { FlatList, Platform, Text } from 'react-native'
export default function CartScreen() {
  const { items } = useCart()
  const [totalQuantity, setTotalQuantity] = useState(0)

  const getTotalQuantity = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  useEffect(() => {
    setTotalQuantity(getTotalQuantity())
  }, [items])

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text>Cart: {totalQuantity}</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}
