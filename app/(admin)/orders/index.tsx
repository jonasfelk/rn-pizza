import orders from '@/assets/data/orders'
import OrderItemListItem from '@/components/OrderItemListItem'
import OrderListItem from '@/components/OrderListItem'
import { Order, OrderItem, OrderStatusList } from '@/types/types'
import { useLocalSearchParams } from 'expo-router'
import { FlatList, Pressable, Text, View } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
export default function Orders() {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item as Order} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  )
}
