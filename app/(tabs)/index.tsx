import products from '@/assets/data/products'
import ProductListItem from '@/components/ProductListItem'
import { FlatList, Text } from 'react-native'

export default function MenuScreen() {
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
      ListFooterComponent={() => <Text>We're out of pizzas :(</Text>}
      ListFooterComponentStyle={{ padding: 10, alignItems: 'center' }}
    />
  )
}
