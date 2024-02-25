import products from '@/assets/data/products'
import Button from '@/components/Button'
import { defaultPizzaImage } from '@/components/ProductListItem'
import Colors from '@/constants/Colors'
import { useCart } from '@/providers/CartProvider'
import { PizzaSize } from '@/types/types'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL', '2XL', '3XL']
export default function ProductDetailsScreen() {
  const { addItem } = useCart()
  const router = useRouter()
  const { id } = useLocalSearchParams()
  const product = products.find((product) => product.id.toString() === id)
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('S')

  const addToCart = () => {
    if (!product) return

    addItem(product, selectedSize)
    router.push('/cart')
  }

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
        <Text style={styles.selectSize}>Select size:</Text>

        <View style={styles.sizesContainer}>
          {sizes.map((size) => (
            <Pressable
              onPress={() => setSelectedSize(size)}
              key={size}
              style={[
                styles.size,
                {
                  backgroundColor:
                    selectedSize === size
                      ? Colors.light.tabIconSelected
                      : 'transparent',
                },
              ]}
            >
              <Text
                style={[
                  styles.sizeText,
                  { color: selectedSize === size ? 'white' : 'black' },
                ]}
              >
                {size}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia, ut
          porro non ipsa modi cupiditate praesentium laboriosam, natus sapiente
          eveniet voluptatem enim fugiat voluptatibus provident magni, veritatis
          molestias sequi nesciunt. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Sint, reprehenderit facere praesentium tempore nulla
          quaerat mollitia et dolorum voluptatum exercitationem neque rem ut,
          sed laborum harum facilis, vero iste cupiditate.
        </Text>
      </ScrollView>
      <View style={styles.button}>
        <Button
          onPress={addToCart}
          text='Add to cart'
        />
      </View>
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
  },
  button: {
    marginTop: 'auto',
  },
})
