import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Inbox } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { formatCurrency, formatDate } from '../../../shared/utils/formatters';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../../../shared/types';
import type { Expense, Category } from '../../../shared/types';

interface RecentExpensesProps {
  expenses: Expense[];
}

export function RecentExpenses({ expenses }: RecentExpensesProps) {
  const router = useRouter();

  if (expenses.length === 0) {
    return (
      <View style={styles.empty}>
        <Inbox color="#CCC" size={48} />
        <Text style={styles.emptyText}>No hay gastos este mes</Text>
        <Text style={styles.emptySubtext}>Toca el botón + para agregar uno</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.sectionTitle}>Últimos gastos</Text>
      {expenses.map((expense) => {
        const Icon = CATEGORY_ICONS[expense.category as Category];
        const color = CATEGORY_COLORS[expense.category as Category];
        return (
          <TouchableOpacity
            key={expense.id}
            style={styles.card}
            onPress={() => router.push(`/edit/${expense.id}`)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconBadge, { backgroundColor: color + '22' }]}>
              <Icon color={color} size={22} />
            </View>
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1}>{expense.name}</Text>
              <Text style={styles.meta}>{expense.category} · {formatDate(expense.date)}</Text>
            </View>
            <Text style={styles.amount}>{formatCurrency(expense.amount)}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A2E',
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    gap: 12,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: '600', color: '#1A1A2E' },
  meta: { fontSize: 12, color: '#999', marginTop: 2 },
  amount: { fontSize: 15, fontWeight: '700', color: '#4A90E2' },
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  emptyText: { fontSize: 16, fontWeight: '600', color: '#555', marginTop: 8 },
  emptySubtext: { fontSize: 13, color: '#999' },
});
