import Button from '@/components/Button'
import CartListItem from '@/components/CartListItem'
import { View } from '@/components/Themed'
import { useQuantityCart } from '@/hooks/useQuantityCart'
import { useCart } from '@/providers/CartProvider'
import { StatusBar } from 'expo-status-bar'
import { FlatList, Platform, Text } from 'react-native'
export default function CartScreen() {
  const { items, totalPrice } = useCart()
  const { totalQuantity } = useQuantityCart()

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 10 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <Text>No items in cart</Text>}
        ListFooterComponent={() => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}
          >
            <Text> Total: {totalPrice}</Text>
            <Text>Count:{totalQuantity}</Text>
          </View>
        )}
      />
      <Button text='Checkout' />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}
