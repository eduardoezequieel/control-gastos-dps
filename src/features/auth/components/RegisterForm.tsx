import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';
import { useRegister } from '../hooks/useRegister';
import {
  getEmailError,
  getPasswordStrengthError,
  getConfirmPasswordError,
  MIN_PASSWORD_LENGTH,
} from '../../../shared/utils/validators';

export function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false, confirm: false });
  const { loading, error, handleRegister } = useRegister();

  const emailError = touched.email ? getEmailError(email) : null;
  const passwordError = touched.password ? getPasswordStrengthError(password) : null;
  const confirmError = touched.confirm ? getConfirmPasswordError(password, confirm) : null;

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
        placeholder={`Mínimo ${MIN_PASSWORD_LENGTH}, con mayúscula y número`}
        secureTextEntry
      />
      <Input
        label="Confirmar contraseña"
        value={confirm}
        onChangeText={setConfirm}
        onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
        error={confirmError}
        placeholder="Repite la contraseña"
        secureTextEntry
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button
        label="Crear Cuenta"
        onPress={() => {
          setTouched({ email: true, password: true, confirm: true });
          handleRegister(email, password, confirm);
        }}
        loading={loading}
        style={styles.button}
      />
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
});
