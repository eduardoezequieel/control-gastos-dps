import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { useAuth } from '../../../shared/hooks/useAuth';
import { getExpensesByMonth, deleteExpense } from '../../expenses/services/expenseService';
import type { Expense } from '../../../shared/types';

interface Filters {
  month: number;
  year: number;
  category: string;
}

export function useHistory() {
  const { user } = useAuth();
  const now = new Date();
  const [filters, setFilters] = useState<Filters>({
    month: now.getMonth(),
    year: now.getFullYear(),
    category: 'Todas',
  });
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getExpensesByMonth(
        user.uid,
        filters.month,
        filters.year,
        filters.category !== 'Todas' ? filters.category : undefined
      );
      setExpenses(data);
    } catch {
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  }, [user, filters]);

  useFocusEffect(useCallback(() => { fetch(); }, [fetch]));

  function updateFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  async function handleDelete(expenseId: string) {
    if (!user) return;
    try {
      await deleteExpense(user.uid, expenseId);
      setExpenses((prev) => prev.filter((e) => e.id !== expenseId));
    } catch {
      // silently ignore — user can pull to refresh
    }
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return { expenses, total, filters, loading, updateFilter, handleDelete, refetch: fetch };
}
