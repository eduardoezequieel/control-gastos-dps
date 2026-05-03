import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import { auth } from '../../../shared/utils/firebase';
import { getFirebaseErrorMessage } from '../../../shared/utils/validators';

interface AuthResult {
  success: boolean;
  error?: string;
}

export async function loginWithEmail(email: string, password: string): Promise<AuthResult> {
  try {
    await signInWithEmailAndPassword(auth, email.trim(), password);
    return { success: true };
  } catch (e: any) {
    return { success: false, error: getFirebaseErrorMessage(e.code) };
  }
}

export async function loginWithGoogle(idToken: string): Promise<AuthResult> {
  try {
    const credential = GoogleAuthProvider.credential(idToken);
    await signInWithCredential(auth, credential);
    return { success: true };
  } catch (e: any) {
    return { success: false, error: getFirebaseErrorMessage(e.code) };
  }
}

export async function registerWithEmail(email: string, password: string): Promise<AuthResult> {
  try {
    await createUserWithEmailAndPassword(auth, email.trim(), password);
    return { success: true };
  } catch (e: any) {
    return { success: false, error: getFirebaseErrorMessage(e.code) };
  }
}

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}
