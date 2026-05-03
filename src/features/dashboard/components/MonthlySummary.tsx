import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatCurrency } from '../../../shared/utils/formatters';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../../../shared/types';
import type { Expense, Category } from '../../../shared/types';

interface MonthlySummaryProps {
  total: number;
  expenses: Expense[];
}

export function MonthlySummary({ total, expenses }: MonthlySummaryProps) {
  const byCategory = expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] ?? 0) + e.amount;
    return acc;
  }, {});

  const sorted = Object.entries(byCategory).sort(([, a], [, b]) => b - a);

  return (
    <View>
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total del mes</Text>
        <Text style={styles.totalAmount}>{formatCurrency(total)}</Text>
        <Text style={styles.totalSub}>{expenses.length} gasto{expenses.length !== 1 ? 's' : ''} registrado{expenses.length !== 1 ? 's' : ''}</Text>
      </View>

      {sorted.length > 0 && (
        <View style={styles.breakdown}>
          <Text style={styles.breakdownTitle}>Por categoría</Text>
          {sorted.map(([cat, amount]) => {
            const Icon = CATEGORY_ICONS[cat as Category];
            const color = CATEGORY_COLORS[cat as Category];
            return (
              <View key={cat} style={styles.row}>
                <View style={styles.rowLeft}>
                  <Icon color={color} size={18} />
                  <Text style={styles.catName}>{cat}</Text>
                </View>
                <View style={styles.rowRight}>
                  <Text style={styles.catAmount}>{formatCurrency(amount)}</Text>
                  <Text style={styles.catPercent}>
                    {total > 0 ? Math.round((amount / total) * 100) : 0}%
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  totalCard: {
    backgroundColor: '#4A90E2',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  totalLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    marginBottom: 6,
  },
  totalAmount: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: -1,
  },
  totalSub: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 4,
  },
  breakdown: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  breakdownTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  catName: { fontSize: 14, color: '#333' },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  catAmount: { fontSize: 14, fontWeight: '600', color: '#333' },
  catPercent: { fontSize: 12, color: '#999', minWidth: 35, textAlign: 'right' },
});
