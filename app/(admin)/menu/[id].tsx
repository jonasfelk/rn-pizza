import { defaultPizzaImage } from '@/components/ProductListItem'
import Colors from '@/constants/Colors'
import { useProduct } from '@/hooks/api/products'
import { PizzaSize } from '@/types/types'
import { FontAwesome } from '@expo/vector-icons'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'

import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL', '2XL', '3XL']
export default function ProductDetailsScreen() {
  const router = useRouter()
  const { id } = useLocalSearchParams()
  const {
    data: product,
    isLoading,
    error,
  } = useProduct(parseInt(typeof id === 'string' ? id : id[0]))

  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error || !product) {
    return <Text>Failed to fetch product</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Menu',
          headerRight: () => (
            <Link
              href={`/(admin)/menu/create?id=${id}`}
              asChild
            >
              <Pressable>
                {({ pressed }) => (
                  <>
                    <FontAwesome
                      name='pencil'
                      size={25}
                      color={Colors.light.text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  </>
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
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
