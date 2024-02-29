import CartQuantity from '@/components/CartQuantity'
import Colors from '@/constants/Colors'
import { useQuantityCart } from '@/hooks/useQuantityCart'
import { FontAwesome } from '@expo/vector-icons'
import { Link, Stack } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

export default function MenuLayout() {
  const { totalQuantity } = useQuantityCart()
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Menu',
          headerRight: () => (
            <Link
              href='/(admin)/menu/create'
              asChild
            >
              <Pressable>
                {({ pressed }) => (
                  <>
                    <FontAwesome
                      name='plus-square-o'
                      size={25}
                      color={Colors.light.text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                    {totalQuantity > 0 && (
                      <CartQuantity totalQuantity={totalQuantity} />
                    )}
                  </>
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  )
}
