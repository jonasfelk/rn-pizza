import products from '@/assets/data/products'
import { defaultPizzaImage } from '@/components/ProductListItem'
import Colors from '@/constants/Colors'
import { Stack, useLocalSearchParams } from 'expo-router'
import { Image, StyleSheet, Text, View } from 'react-native'

const sizes = ['S', 'M', 'L', 'XL', '2XL', '3XL']
export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams()
  const product = products.find((product) => product.id.toString() === id)

  if (!product) {
    return <Text>Product not found</Text>
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Product Details' }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.selectSize}>Select size:</Text>
      <View style={styles.sizesContainer}>
        {sizes.map((size) => (
          <View
            key={size}
            style={styles.size}
          >
            <Text style={styles.sizeText}> {size}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
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
  selectSize: {
    fontSize: 18,
  },
  sizesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  size: {
    backgroundColor: Colors.light.tabIconDefault,
    width: 50,
    aspectRatio: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 5,
  },
})
