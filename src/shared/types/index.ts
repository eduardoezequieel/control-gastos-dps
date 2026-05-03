import type { LucideIcon } from 'lucide-react-native';
import {
  UtensilsCrossed,
  Car,
  Gamepad2,
  HeartPulse,
  GraduationCap,
  Package,
} from 'lucide-react-native';

export type Category =
  | 'Alimentación'
  | 'Transporte'
  | 'Entretenimiento'
  | 'Salud'
  | 'Educación'
  | 'Otros';

export const CATEGORIES: Category[] = [
  'Alimentación',
  'Transporte',
  'Entretenimiento',
  'Salud',
  'Educación',
  'Otros',
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Alimentación: '#FF6B6B',
  Transporte: '#4ECDC4',
  Entretenimiento: '#A29BFE',
  Salud: '#55EFC4',
  Educación: '#FDCB6E',
  Otros: '#B2BEC3',
};

export const CATEGORY_ICONS: Record<Category, LucideIcon> = {
  Alimentación: UtensilsCrossed,
  Transporte: Car,
  Entretenimiento: Gamepad2,
  Salud: HeartPulse,
  Educación: GraduationCap,
  Otros: Package,
};

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: Category;
  date: Date;
  createdAt: Date;
}

export interface ExpenseFormData {
  name: string;
  amount: string;
  category: Category;
  date: Date;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
