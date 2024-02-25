import { Text, View, StyleSheet } from 'react-native'

type CartQuantityProps = {
  totalQuantity: number
}
export default function CartQuantity({ totalQuantity }: CartQuantityProps) {
  return (
    <View
      style={styles.container}
    >
      <Text
        style={styles.text}
      >
        {totalQuantity}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 100,
    padding: 1,
    right: 5,
    top: -7,
    width: 20,
    height: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  }
})
