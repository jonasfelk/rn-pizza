import Colors from '@/constants/Colors'
import { Product } from '@/types/types'
import { Link } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, Pressable } from 'react-native'

export const defaultPizzaImage =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'
export default function ProductListItem({ product }: { product: Product }) {
  return (
    <Link
      // href={`/menu/${product.id}`}
      href={{
        pathname: '/(tabs)/menu/[id]',
        params: { id: `${product.id}` },
      }}
      asChild
    >
      <Pressable style={styles.container}>
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.image}
          resizeMode='contain'
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  )
//   <Link
//   href='/cart'
//   asChild
// >
//   <Pressable>
//     {({ pressed }) => (
//       <FontAwesome
//         name='shopping-cart'
//         size={25}
//         color={Colors.light.text}
//         style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
//       />
//     )}
//   </Pressable>
// </Link>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '50%',
    backgroundColor: Colors.light.background,
    padding: 10,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: '600',
    fontSize: 16,
  },
})
