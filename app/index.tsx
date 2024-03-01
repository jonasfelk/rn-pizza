import Button from '@/components/Button'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import { Link, Redirect } from 'expo-router'
import { ActivityIndicator, View } from 'react-native'

export default function Index() {
  const { session, loading } = useAuth()

  if (loading) {
    return <ActivityIndicator size='large' />
  }
  if (!session) {
    return <Redirect href={'/sign-in'} />
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link
        href={'/(user)'}
        asChild
      >
        <Button text='User' />
      </Link>
      <Link
        href={'/(admin)'}
        asChild
      >
        <Button text='Admin' />
      </Link>
      <Link
        href={'/sign-in'}
        asChild
      >
        <Button text='Sign In' />
      </Link>
      <Button
        onPress={() => supabase.auth.signOut()}
        text='Sign Out'
      />
    </View>
  )
}
