import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar, CheckCircle2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';
import { CategoryPicker } from './CategoryPicker';
import { formatDate } from '../../../shared/utils/formatters';
import {
  getExpenseNameError,
  getExpenseAmountError,
  MAX_EXPENSE_NAME_LENGTH,
} from '../../../shared/utils/validators';
import type { ExpenseFormData } from '../../../shared/types';

interface ExpenseFormProps {
  form: ExpenseFormData;
  updateField: <K extends keyof ExpenseFormData>(key: K, value: ExpenseFormData[K]) => void;
  loading: boolean;
  error: string | null;
  success: boolean;
  submit: () => Promise<{ ok: true; date: Date } | { ok: false }>;
  submitLabel?: string;
}

export function ExpenseForm({
  form,
  updateField,
  loading,
  error,
  success,
  submit,
  submitLabel = 'Guardar Gasto',
}: ExpenseFormProps) {
  const router = useRouter();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [touched, setTouched] = useState({ name: false, amount: false });

  const nameError = touched.name ? getExpenseNameError(form.name) : null;
  const amountError = touched.amount ? getExpenseAmountError(form.amount) : null;

  async function handleSubmit() {
    setTouched({ name: true, amount: true });
    const result = await submit();
    if (result.ok) {
      router.replace({
        pathname: '/(app)',
        params: {
          month: String(result.date.getMonth()),
          year: String(result.date.getFullYear()),
        },
      });
    }
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Input
        label="Nombre del gasto"
        value={form.name}
        onChangeText={(v) => updateField('name', v)}
        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
        error={nameError}
        placeholder="Ej: Almuerzo, Gasolina..."
        maxLength={MAX_EXPENSE_NAME_LENGTH}
      />

      <Input
        label="Monto ($)"
        value={form.amount}
        onChangeText={(v) => updateField('amount', v)}
        onBlur={() => setTouched((t) => ({ ...t, amount: true }))}
        error={amountError}
        placeholder="0.00"
        keyboardType="decimal-pad"
        autoCapitalize="none"
      />

      <CategoryPicker value={form.category} onChange={(v) => updateField('category', v)} />

      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>Fecha</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
          <Calendar color="#4A90E2" size={18} />
          <Text style={styles.dateText}>{formatDate(form.date)}</Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={form.date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          maximumDate={new Date()}
          onChange={(_, selected) => {
            setShowDatePicker(false);
            if (selected) updateField('date', selected);
          }}
        />
      )}

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? (
        <View style={styles.successRow}>
          <CheckCircle2 color="#27AE60" size={18} />
          <Text style={styles.successText}>Gasto guardado correctamente</Text>
        </View>
      ) : null}

      <Button
        label={submitLabel}
        onPress={handleSubmit}
        loading={loading}
        style={styles.button}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    marginBottom: 16,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  dateText: {
    fontSize: 15,
    color: '#333',
  },
  error: {
    color: '#E74C3C',
    fontSize: 13,
    marginBottom: 12,
    textAlign: 'center',
  },
  successRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  successText: {
    color: '#27AE60',
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    marginTop: 4,
    marginBottom: 20,
  },
});
