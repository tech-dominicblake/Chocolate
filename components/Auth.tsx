import { IMAGES } from '@/constants'
import { storeUserData } from '@/utils/userStorage'
import {
  GoogleSignin,
  statusCodes
} from '@react-native-google-signin/google-signin'
import { router } from 'expo-router'
import { useState } from 'react'
import { supabase } from '../utils/supabase'
import ActionButton from './prompts/ActionButton'

interface AuthProps {
  buttonText: string;
}

export default function ({ buttonText }: AuthProps) {
  GoogleSignin.configure({
    // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    offlineAccess: true,
    webClientId: '479407816447-kcfcj9lbegfgf3p1tea7hm7442fq4egi.apps.googleusercontent.com',
    iosClientId: '479407816447-aa3frtdkhnoqoem3vf9t9eqelpmnvumv.apps.googleusercontent.com',
  })

  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  return (
    <ActionButton
      // size={GoogleSigninButton.Size.Wide}
      // color={GoogleSigninButton.Color.Dark}
      title={buttonText}
      variant="primary"
      backgroundImage={IMAGES.IMAGES.buttonBg2}
      color='#5556A3'
      loading={isGoogleLoading}
      disabled={isGoogleLoading}
      onPress={async () => {
        try {
          setIsGoogleLoading(true)
          const hasPlayServices = await GoogleSignin.hasPlayServices()
          console.log({hasPlayServices})
          const userInfo = await GoogleSignin.signIn()
          console.log("userInfo.data", userInfo.data?.idToken)
          if (userInfo && userInfo.data && userInfo.data.idToken) {
            const { data, error } = await supabase.auth.signInWithIdToken({
              provider: 'google',
              token: userInfo.data.idToken,
            })
            console.log(error, data)
            
            if (!error && data.user) {
              // Store user data with 2-day expiration
              await storeUserData({
                id: data.user.id,
                email: data.user.email!,
                created_at: data.user.created_at,
              });
              // Navigate to ageGate after successful sign in
              router.push('/ageGate')
            }
          } else {
            throw new Error('no ID token present!')
          }
          setIsGoogleLoading(false)
        } catch (error: any) {
          console.log({error})
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      }}
    />
  )
}