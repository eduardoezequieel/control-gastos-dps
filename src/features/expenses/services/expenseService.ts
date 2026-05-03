import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  orderBy,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../../../shared/utils/firebase';
import type { Expense, ExpenseFormData } from '../../../shared/types';

function expensesRef(uid: string) {
  return collection(db, 'users', uid, 'expenses');
}

export async function addExpense(uid: string, data: ExpenseFormData): Promise<void> {
  await addDoc(expensesRef(uid), {
    name: data.name.trim(),
    amount: parseFloat(data.amount),
    category: data.category,
    date: Timestamp.fromDate(data.date),
    createdAt: Timestamp.now(),
  });
}

export async function deleteExpense(uid: string, expenseId: string): Promise<void> {
  await deleteDoc(doc(db, 'users', uid, 'expenses', expenseId));
}

export async function updateExpense(
  uid: string,
  expenseId: string,
  data: ExpenseFormData
): Promise<void> {
  await updateDoc(doc(db, 'users', uid, 'expenses', expenseId), {
    name: data.name.trim(),
    amount: parseFloat(data.amount),
    category: data.category,
    date: Timestamp.fromDate(data.date),
  });
}

export async function getExpense(uid: string, expenseId: string): Promise<Expense | null> {
  const snap = await getDoc(doc(db, 'users', uid, 'expenses', expenseId));
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    id: snap.id,
    name: data.name,
    amount: data.amount,
    category: data.category,
    date: (data.date as Timestamp).toDate(),
    createdAt: (data.createdAt as Timestamp).toDate(),
  };
}

export async function getExpensesByMonth(
  uid: string,
  month: number,
  year: number,
  category?: string
): Promise<Expense[]> {
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0, 23, 59, 59);

  const constraints: any[] = [
    where('date', '>=', Timestamp.fromDate(start)),
    where('date', '<=', Timestamp.fromDate(end)),
    orderBy('date', 'desc'),
  ];

  if (category && category !== 'Todas') {
    constraints.unshift(where('category', '==', category));
  }

  const q = query(expensesRef(uid), ...constraints);
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      name: data.name,
      amount: data.amount,
      category: data.category,
      date: (data.date as Timestamp).toDate(),
      createdAt: (data.createdAt as Timestamp).toDate(),
    } as Expense;
  });
}
