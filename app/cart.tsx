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
    <View
      style={{
        flex: 1,
        padding: 10,
      }}
    >
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 10 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: 'center' }}> No items in cart :(</Text>
        )}
        ListFooterComponent={() =>
          items.length > 0 ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}
            >
              <Text> Total: {totalPrice}</Text>
              <Text>Count: {totalQuantity}</Text>
            </View>
          ) : null
        }
      />
      {items.length > 0 ? <Button text='Checkout' /> : null}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}
