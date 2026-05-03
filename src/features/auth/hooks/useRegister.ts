import { useState } from 'react';
import { registerWithEmail } from '../services/authService';
import {
  getEmailError,
  getPasswordStrengthError,
  getConfirmPasswordError,
} from '../../../shared/utils/validators';

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRegister(email: string, password: string, confirmPassword: string) {
    const emailErr = getEmailError(email);
    if (emailErr) { setError(emailErr); return; }
    const passwordErr = getPasswordStrengthError(password);
    if (passwordErr) { setError(passwordErr); return; }
    const confirmErr = getConfirmPasswordError(password, confirmPassword);
    if (confirmErr) { setError(confirmErr); return; }

    setLoading(true);
    setError(null);
    const result = await registerWithEmail(email, password);
    if (!result.success) setError(result.error ?? null);
    setLoading(false);
  }

  return { loading, error, handleRegister };
}
