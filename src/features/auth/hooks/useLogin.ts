import { useState, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { loginWithEmail, loginWithGoogle } from '../services/authService';
import { validateEmail } from '../../../shared/utils/validators';

WebBrowser.maybeCompleteAuthSession();

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { googleWebClientId, googleAndroidClientId, googleIosClientId } =
    Constants.expoConfig?.extra ?? {};

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    webClientId: googleWebClientId,
    androidClientId: googleAndroidClientId || googleWebClientId,
    iosClientId: googleIosClientId || googleWebClientId,
  });

  useEffect(() => {
    if (!request) return;
    AsyncStorage.setItem(
      '@oauth_pending',
      JSON.stringify({
        codeVerifier: request.codeVerifier,
        redirectUri: request.redirectUri,
        clientId: request.clientId,
      })
    );
  }, [request]);

  useEffect(() => {
    if (!response) return;
    if (response.type === 'success') {
      const idToken = response.params.id_token;
      handleGoogleCredential(idToken);
    } else if (response.type === 'error') {
      setError('No se pudo iniciar sesión con Google. Intenta de nuevo.');
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [response]);

  async function handleGoogleCredential(idToken: string) {
    setLoading(true);
    setError(null);
    const result = await loginWithGoogle(idToken);
    if (!result.success) setError(result.error ?? null);
    setLoading(false);
  }

  async function handleEmailLogin(email: string, password: string) {
    if (!email.trim()) { setError('Ingresa tu correo electrónico.'); return; }
    if (!validateEmail(email)) { setError('El correo no es válido.'); return; }
    if (!password) { setError('Ingresa tu contraseña.'); return; }

    setLoading(true);
    setError(null);
    const result = await loginWithEmail(email, password);
    if (!result.success) setError(result.error ?? null);
    setLoading(false);
  }

  async function handleGoogleLogin() {
    setError(null);
    setLoading(true);
    await promptAsync();
  }

  return { loading, error, request, handleEmailLogin, handleGoogleLogin };
}
