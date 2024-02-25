import CartQuantity from '@/components/CartQuantity'
import Colors from '@/constants/Colors'
import { useQuantityCart } from '@/hooks/useQuantityCart'
import { FontAwesome } from '@expo/vector-icons'
import { Link, Stack } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

export default function MenuLayout() {
  const { totalQuantity } = useQuantityCart()
  return (
    <Stack
      
      screenOptions={{
        headerRight: () => (
          <Link
            href='/cart'
            asChild
          >
            <Pressable>
              {({ pressed }) => (
                <>
                  <FontAwesome
                    name='shopping-cart'
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
    >
      <Stack.Screen
        name='index'
        options={{ title: 'Menu' }}
      />
    </Stack>
  )
}
