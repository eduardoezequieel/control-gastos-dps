import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ExpenseForm } from '../components/ExpenseForm';
import { useAddExpense } from '../hooks/useAddExpense';

export function AddExpenseScreen() {
  const formState = useAddExpense();
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Nuevo Gasto</Text>
      <ExpenseForm {...formState} submitLabel="Guardar Gasto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 20,
  },
});
