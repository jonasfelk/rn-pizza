import { useAdminOrderList } from '@/api/orders'
import OrderListItem from '@/components/OrderListItem'
import { ActivityIndicator, FlatList, Text } from 'react-native'
export default function Orders() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false })

  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error) {
    return <Text>Failed to fetch</Text>
  }
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  )
}
