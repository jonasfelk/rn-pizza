import orders from '@/assets/data/orders'
import OrderListItem from '@/components/OrderListItem'
import { Order } from '@/types'
import { FlatList } from 'react-native'
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
