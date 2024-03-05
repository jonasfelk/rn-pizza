import { supabase } from '@/lib/supabase'
import { View, Text, Button } from 'react-native'

export default function Profile() {
  return (
    <View>
      <Text>Profile</Text>
      <Button
        title='Logout'
        onPress={async () => await supabase.auth.signOut()}
      />
    </View>
  )
}
