import { useState, useEffect, useCallback } from 'react';
import { useLocalSearchParams, useFocusEffect } from 'expo-router';
import { useAuth } from '../../../shared/hooks/useAuth';
import { getExpensesByMonth } from '../../expenses/services/expenseService';
import type { Expense } from '../../../shared/types';

export function useDashboard() {
  const { user } = useAuth();
  const params = useLocalSearchParams<{ month?: string; year?: string }>();
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.month !== undefined) setSelectedMonth(Number(params.month));
    if (params.year !== undefined) setSelectedYear(Number(params.year));
  }, [params.month, params.year]);

  const fetch = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getExpensesByMonth(user.uid, selectedMonth, selectedYear);
      setExpenses(data);
    } catch {
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  }, [user, selectedMonth, selectedYear]);

  useFocusEffect(useCallback(() => { fetch(); }, [fetch]));

  function changeMonth(direction: 'prev' | 'next') {
    setSelectedMonth((prev) => {
      let m = prev + (direction === 'next' ? 1 : -1);
      let y = selectedYear;
      if (m > 11) { m = 0; y += 1; }
      if (m < 0) { m = 11; y -= 1; }
      setSelectedYear(y);
      return m;
    });
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const recentExpenses = expenses.slice(0, 5);

  return { expenses, recentExpenses, total, selectedMonth, selectedYear, loading, changeMonth, refetch: fetch };
}
