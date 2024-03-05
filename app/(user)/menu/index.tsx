import { useProductList } from '@/api/products'
import ProductListItem from '@/components/ProductListItem'
import { ActivityIndicator, FlatList, Text } from 'react-native'

export default function MenuScreen() {
  const { data: products, isLoading, error } = useProductList()

  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error) {
    return <Text>Failed to fetch products</Text>
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => <Text>No products found</Text>}
      ListHeaderComponent={() => <Text>Choose your pizza</Text>}
    />
  )
}
