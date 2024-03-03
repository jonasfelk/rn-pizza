import Button from '@/components/Button'
import { defaultPizzaImage } from '@/components/ProductListItem'
import Colors from '@/constants/Colors'
import { useEffect, useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from '@/hooks/api/products'
export default function CreateProduct() {
  const [image, setImage] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0])
  const isUpdating = !!idString
  const router = useRouter()

  const { mutate: insertProduct, isPending: isInsertPending } =
    useInsertProduct()
  const { mutate: updateProduct, isPending: isUpdatePending } =
    useUpdateProduct()
  const { mutate: deleteProduct, isPending: isDeletePending } =
    useDeleteProduct()
  const { data: updatingProduct } = useProduct(id)

  const isAnyPending = isInsertPending || isUpdatePending

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name)
      setPrice(updatingProduct.price.toString())
      setImage(updatingProduct.image)
    }
  }, [updatingProduct])

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }
  const onSubmit = () => {
    if (isUpdating) {
      onUpdate()
    } else {
      onCreate()
    }
  }
  const onUpdate = () => {
    updateProduct(
      { id, name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          resetFields()
          router.back()
        },
      }
    )
  }
  const onCreate = () => {
    insertProduct(
      { name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          resetFields()
          router.back()
        },
      }
    )
  }
  const resetFields = () => {
    setName('')
    setPrice('')
  }
  const onDelete = () => {
    deleteProduct(id, {
      onSuccess: () => {
        resetFields()
        router.replace('/(admin)')
      },
    })
  }
  const confirmDelete = () => {
    Alert.alert('Confirm', 'Are you sure you want to delete this product?', [
      {
        text: 'Cancel',
      },
      {
        text: 'Delete',
        onPress: onDelete,
        style: 'destructive',
      },
    ])
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? 'Update Product' : 'Create Product' }}
      />
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
        onPress={onSubmit}
        text={isAnyPending ? 'Processing...' : isUpdating ? 'Update' : 'Create'}
        disabled={isAnyPending}
      />
      {isUpdating && (
        <Text
          onPress={confirmDelete}
          style={styles.textButton}
        >
          {isDeletePending ? 'Deleting...' : 'Delete Product'}
          {isDeletePending && (
            <ActivityIndicator
              size='small'
              color='#0000ff'
            />
          )}
        </Text>
      )}
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
