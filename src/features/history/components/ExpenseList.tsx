import React from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { Inbox, Trash2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { formatCurrency, formatDate } from '../../../shared/utils/formatters';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../../../shared/types';
import type { Expense, Category } from '../../../shared/types';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  total: number;
}

export function ExpenseList({ expenses, onDelete, total }: ExpenseListProps) {
  const router = useRouter();

  function confirmDelete(expense: Expense) {
    Alert.alert(
      'Eliminar gasto',
      `¿Eliminar "${expense.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => onDelete(expense.id) },
      ]
    );
  }

  if (expenses.length === 0) {
    return (
      <View style={styles.empty}>
        <Inbox color="#CCC" size={48} />
        <Text style={styles.emptyText}>Sin gastos en este período</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total filtrado</Text>
        <Text style={styles.totalAmount}>{formatCurrency(total)}</Text>
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(e) => e.id}
        scrollEnabled={false}
        renderItem={({ item }) => {
          const Icon = CATEGORY_ICONS[item.category as Category];
          const color = CATEGORY_COLORS[item.category as Category];
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/edit/${item.id}`)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconBadge, { backgroundColor: color + '22' }]}>
                <Icon color={color} size={22} />
              </View>
              <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.meta}>{item.category} · {formatDate(item.date)}</Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.amount}>{formatCurrency(item.amount)}</Text>
                <TouchableOpacity onPress={() => confirmDelete(item)} style={styles.deleteBtn}>
                  <Trash2 color="#E74C3C" size={16} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4A90E2',
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
  right: {
    alignItems: 'flex-end',
    gap: 4,
  },
  amount: { fontSize: 14, fontWeight: '700', color: '#333' },
  deleteBtn: { padding: 4 },
  empty: {
    alignItems: 'center',
    paddingVertical: 50,
    gap: 10,
  },
  emptyText: { fontSize: 15, color: '#999', marginTop: 4 },
});
