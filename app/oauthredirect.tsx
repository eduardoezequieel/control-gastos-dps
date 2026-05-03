import { useEffect } from 'react';
import { View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginWithGoogle } from '../src/features/auth/services/authService';

WebBrowser.maybeCompleteAuthSession();

export default function OAuthRedirect() {
  const router = useRouter();
  const params = useLocalSearchParams<{ code?: string; error?: string }>();

  useEffect(() => {
    const code = params.code;
    if (!code) {
      router.replace('/(auth)/login');
      return;
    }

    (async () => {
      try {
        const stored = await AsyncStorage.getItem('@oauth_pending');
        if (!stored) {
          console.warn('[OAuthRedirect] no pending oauth state');
          router.replace('/(auth)/login');
          return;
        }
        const { codeVerifier, redirectUri, clientId } = JSON.parse(stored);

        const tokenResult = await AuthSession.exchangeCodeAsync(
          {
            clientId,
            code,
            redirectUri,
            extraParams: { code_verifier: codeVerifier },
          },
          { tokenEndpoint: 'https://oauth2.googleapis.com/token' }
        );

        const idToken = tokenResult.idToken;
        if (!idToken) {
          console.warn('[OAuthRedirect] no id_token in token response', tokenResult);
          router.replace('/(auth)/login');
          return;
        }

        await loginWithGoogle(idToken);
        await AsyncStorage.removeItem('@oauth_pending');
        // AuthContext detecta el cambio y redirige al home.
      } catch (e) {
        console.warn('[OAuthRedirect] exchange failed', e);
        router.replace('/(auth)/login');
      }
    })();
  }, [params.code, router]);

  return <View />;
}
