import orders from '@/assets/data/orders'
import OrderItemListItem from '@/components/OrderItemListItem'
import OrderListItem from '@/components/OrderListItem'
import Colors from '@/constants/Colors'
import { Order, OrderItem, OrderStatusList } from '@/types/types'
import { Stack, useLocalSearchParams } from 'expo-router'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'

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
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: 'bold' }}>Status</Text>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => console.warn('Update status')}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order?.status === status
                        ? Colors.light.tint
                        : 'transparent',
                  }}
                >
                  <Text
                    style={{
                      color:
                        order?.status === status ? 'white' : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
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
