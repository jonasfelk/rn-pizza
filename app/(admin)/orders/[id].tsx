import { useOrderDetails, useUpdateOrder } from '@/api/orders'
import OrderItemListItem from '@/components/OrderItemListItem'
import OrderListItem from '@/components/OrderListItem'
import Colors from '@/constants/Colors'
import { notifyUserAboutOrderUpdate } from '@/lib/notifications'
import { OrderStatus, OrderStatusList } from '@/types'
import { Stack, useLocalSearchParams } from 'expo-router'
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default function OrderDetail() {
  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0])

  const { data: order, isLoading, error } = useOrderDetails(id)

  const { mutate: updateOrder, isPending } = useUpdateOrder()

  const updateStatus = async (status: OrderStatus) => {
    await updateOrder({ id, updatedFields: { status } })

    if (order) {
      await notifyUserAboutOrderUpdate({ ...order, status })
    }
  }

  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error || !order) {
    return <Text>Failed to fetch</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order?.id}` }} />

      <OrderListItem order={order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: 'bold' }}>
              Status {isPending && <ActivityIndicator size={12} />}
            </Text>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateStatus(status)}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : 'transparent',
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? 'white' : Colors.light.tint,
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
