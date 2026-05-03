import { useState } from 'react';
import { useAuth } from '../../../shared/hooks/useAuth';
import { addExpense } from '../services/expenseService';
import { validateExpenseForm } from '../../../shared/utils/validators';
import type { Category, ExpenseFormData } from '../../../shared/types';

const DEFAULT_FORM: ExpenseFormData = {
  name: '',
  amount: '',
  category: 'Alimentación',
  date: new Date(),
};

export function useAddExpense() {
  const { user } = useAuth();
  const [form, setForm] = useState<ExpenseFormData>(DEFAULT_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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
      await addExpense(user.uid, form);
      setSuccess(true);
      setForm(DEFAULT_FORM);
      return { ok: true, date: savedDate };
    } catch {
      setError('No se pudo guardar el gasto. Intenta de nuevo.');
      return { ok: false };
    } finally {
      setLoading(false);
    }
  }

  return { form, updateField, loading, error, success, submit };
}
