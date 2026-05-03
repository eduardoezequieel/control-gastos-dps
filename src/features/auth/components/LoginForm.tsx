import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';
import { GoogleSignInButton } from './GoogleSignInButton';
import { useLogin } from '../hooks/useLogin';
import {
  getEmailError,
  getPasswordRequiredError,
} from '../../../shared/utils/validators';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const { loading, error, request, handleEmailLogin, handleGoogleLogin } = useLogin();

  const emailError = touched.email ? getEmailError(email) : null;
  const passwordError = touched.password ? getPasswordRequiredError(password) : null;

  return (
    <View style={styles.container}>
      <Input
        label="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        onBlur={() => setTouched((t) => ({ ...t, email: true }))}
        error={emailError}
        placeholder="correo@ejemplo.com"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        onBlur={() => setTouched((t) => ({ ...t, password: true }))}
        error={passwordError}
        placeholder="Tu contraseña"
        secureTextEntry
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button
        label="Iniciar Sesión"
        onPress={() => {
          setTouched({ email: true, password: true });
          handleEmailLogin(email, password);
        }}
        loading={loading}
        style={styles.button}
      />

      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.orText}>o</Text>
        <View style={styles.line} />
      </View>

      <GoogleSignInButton onPress={handleGoogleLogin} disabled={!request || loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  error: {
    color: '#E74C3C',
    fontSize: 13,
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
    marginTop: 4,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  orText: {
    color: '#999',
    fontSize: 14,
  },
});
