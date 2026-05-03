export const MAX_EXPENSE_NAME_LENGTH = 60;
export const MAX_EXPENSE_AMOUNT = 1_000_000;
export const MIN_PASSWORD_LENGTH = 8;

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validateAmount(amount: string): boolean {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0 && num <= MAX_EXPENSE_AMOUNT;
}

export function validatePassword(password: string): boolean {
  return getPasswordStrengthError(password) === null;
}

export function getEmailError(email: string): string | null {
  if (!email.trim()) return 'Ingresa tu correo electrónico.';
  if (!validateEmail(email)) return 'El correo no es válido.';
  return null;
}

export function getPasswordRequiredError(password: string): string | null {
  if (!password) return 'Ingresa tu contraseña.';
  return null;
}

export function getPasswordStrengthError(password: string): string | null {
  if (!password) return 'Ingresa una contraseña.';
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  }
  if (!/[A-Z]/.test(password)) return 'Debe incluir al menos una letra mayúscula.';
  if (!/[a-z]/.test(password)) return 'Debe incluir al menos una letra minúscula.';
  if (!/[0-9]/.test(password)) return 'Debe incluir al menos un número.';
  return null;
}

export function getConfirmPasswordError(password: string, confirm: string): string | null {
  if (!confirm) return 'Confirma tu contraseña.';
  if (password !== confirm) return 'Las contraseñas no coinciden.';
  return null;
}

export function getExpenseNameError(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) return 'El nombre del gasto es requerido.';
  if (trimmed.length > MAX_EXPENSE_NAME_LENGTH) {
    return `Máximo ${MAX_EXPENSE_NAME_LENGTH} caracteres.`;
  }
  return null;
}

export function getExpenseAmountError(amount: string): string | null {
  if (!amount.trim()) return 'Ingresa un monto.';
  const num = parseFloat(amount);
  if (isNaN(num) || num <= 0) return 'Ingresa un monto válido mayor a 0.';
  if (num > MAX_EXPENSE_AMOUNT) {
    return `El monto no puede superar $${MAX_EXPENSE_AMOUNT.toLocaleString()}.`;
  }
  return null;
}

export function validateExpenseForm(data: { name: string; amount: string }): string[] {
  const errors: string[] = [];
  const nameErr = getExpenseNameError(data.name);
  if (nameErr) errors.push(nameErr);
  const amtErr = getExpenseAmountError(data.amount);
  if (amtErr) errors.push(amtErr);
  return errors;
}

export function getFirebaseErrorMessage(code: string): string {
  const messages: Record<string, string> = {
    'auth/invalid-email': 'Correo electrónico inválido.',
    'auth/user-not-found': 'No existe una cuenta con este correo.',
    'auth/wrong-password': 'Contraseña incorrecta.',
    'auth/email-already-in-use': 'Este correo ya está registrado.',
    'auth/weak-password': 'La contraseña debe tener al menos 8 caracteres con mayúscula, minúscula y número.',
    'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde.',
    'auth/network-request-failed': 'Sin conexión a internet.',
    'auth/invalid-credential': 'Credenciales inválidas. Verifica tu correo y contraseña.',
  };
  return messages[code] ?? 'Ocurrió un error. Intenta de nuevo.';
}
