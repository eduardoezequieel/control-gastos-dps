import { useState, useEffect } from 'react';
import { useAuth } from '../../../shared/hooks/useAuth';
import { getExpense, updateExpense } from '../services/expenseService';
import { validateExpenseForm } from '../../../shared/utils/validators';
import type { ExpenseFormData } from '../../../shared/types';

const EMPTY_FORM: ExpenseFormData = {
  name: '',
  amount: '',
  category: 'Alimentación',
  date: new Date(),
};

export function useEditExpense(expenseId: string) {
  const { user } = useAuth();
  const [form, setForm] = useState<ExpenseFormData>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  useEffect(() => {
    if (!user || !expenseId) return;
    (async () => {
      setLoadingInitial(true);
      try {
        const expense = await getExpense(user.uid, expenseId);
        if (expense) {
          setForm({
            name: expense.name,
            amount: String(expense.amount),
            category: expense.category,
            date: expense.date,
          });
        } else {
          setError('Gasto no encontrado.');
        }
      } catch {
        setError('No se pudo cargar el gasto.');
      } finally {
        setLoadingInitial(false);
      }
    })();
  }, [user, expenseId]);

  function updateField<K extends keyof ExpenseFormData>(key: K, value: ExpenseFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
    setSuccess(false);
  }

  async function submit(): Promise<{ ok: true; date: Date } | { ok: false }> {
    if (!user) return { ok: false };
    const errors = validateExpenseForm(form);
    if (errors.length > 0) { setError(errors[0]); return { ok: false }; }

    const savedDate = form.date;
    setLoading(true);
    setError(null);
    try {
      await updateExpense(user.uid, expenseId, form);
      setSuccess(true);
      return { ok: true, date: savedDate };
    } catch {
      setError('No se pudo actualizar el gasto. Intenta de nuevo.');
      return { ok: false };
    } finally {
      setLoading(false);
    }
  }

  return { form, updateField, loading, error, success, submit, loadingInitial };
}
