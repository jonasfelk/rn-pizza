import Button from '@/components/Button'
import { defaultPizzaImage } from '@/components/ProductListItem'
import Colors from '@/constants/Colors'
import { useState } from 'react'
import { Text, View, StyleSheet, TextInput, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Stack } from 'expo-router'
export default function CreateProduct() {
  const [image, setImage] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const onCreate = () => {
    console.warn('create')
    resetFields()
  }
  const resetFields = () => {
    setName('')
    setPrice('')
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Create Product' }} />
      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text
        onPress={pickImage}
        style={styles.textButton}
      >
        Select image
      </Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder='Name'
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        placeholder='9.99$'
        keyboardType='numeric'
      />
      <Button
        onPress={onCreate}
        text='Create'
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  textButton: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 20,
  },
  label: {
    color: 'gray',
  },
  input: {
    backgroundColor: 'white',
    fontSize: 16,
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
})
