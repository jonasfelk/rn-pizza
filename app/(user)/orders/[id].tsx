import orders from '@/assets/data/orders'
import OrderItemListItem from '@/components/OrderItemListItem'
import OrderListItem from '@/components/OrderListItem'
import { Order, OrderItem } from '@/types'
import { Stack, useLocalSearchParams } from 'expo-router'
import { FlatList, StyleSheet, Text, View } from 'react-native'

export default function OrderDetail() {
  const { id } = useLocalSearchParams()

  const order = orders.find((order) => order.id.toString() === id)

  if (!order) {
    return <Text>Order not found!</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <OrderListItem order={order as Order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => (
          <OrderItemListItem item={item as OrderItem} />
        )}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
})
