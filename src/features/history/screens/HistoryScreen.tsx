import React from 'react';
import { ScrollView, Text, RefreshControl, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHistory } from '../hooks/useHistory';
import { HistoryFilters } from '../components/HistoryFilters';
import { ExpenseList } from '../components/ExpenseList';

export function HistoryScreen() {
  const { expenses, total, filters, loading, updateFilter, handleDelete, refetch } = useHistory();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
      >
        <Text style={styles.title}>Historial</Text>

        <HistoryFilters
          month={filters.month}
          year={filters.year}
          category={filters.category}
          onMonthChange={(m) => updateFilter('month', m)}
          onYearChange={(y) => updateFilter('year', y)}
          onCategoryChange={(c) => updateFilter('category', c)}
        />

        <ExpenseList expenses={expenses} onDelete={handleDelete} total={total} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 16,
  },
});
