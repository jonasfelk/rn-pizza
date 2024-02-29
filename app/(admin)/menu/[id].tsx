import products from '@/assets/data/products'
import { defaultPizzaImage } from '@/components/ProductListItem'
import Colors from '@/constants/Colors'
import { PizzaSize } from '@/types/types'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'

import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL', '2XL', '3XL']
export default function ProductDetailsScreen() {
  const router = useRouter()
  const { id } = useLocalSearchParams()
  const product = products.find((product) => product.id.toString() === id)

  if (!product) {
    return <Text>Product not found</Text>
  }
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Stack.Screen options={{ title: 'Product Details' }} />
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.image}
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.tint,
    marginVertical: 20,
  },
})
