import { View, Text, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '@clerk/clerk-expo'

const ProfileTab = () => {
  const { signOut } = useAuth()
  return (
    <SafeAreaView className='bg-surface flex-1'>
      <ScrollView className='flex-1'>
        <Text className='text-white'>ProfileTab</Text>
        <Pressable onPress={()=>signOut()} className='mt-4 p-4 bg-primary rounded'>
          <Text>signout</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileTab