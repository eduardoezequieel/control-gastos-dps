import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CATEGORIES } from '../../../shared/types';
import { getMonthLabel } from '../../../shared/utils/formatters';

const MONTHS = Array.from({ length: 12 }, (_, i) => i);
const YEARS = [new Date().getFullYear() - 1, new Date().getFullYear()];

interface HistoryFiltersProps {
  month: number;
  year: number;
  category: string;
  onMonthChange: (m: number) => void;
  onYearChange: (y: number) => void;
  onCategoryChange: (c: string) => void;
}

export function HistoryFilters({
  month,
  year,
  category,
  onMonthChange,
  onYearChange,
  onCategoryChange,
}: HistoryFiltersProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.pickerBox}>
          <Text style={styles.label}>Mes</Text>
          <View style={styles.pickerWrap}>
            <Picker
              selectedValue={month}
              onValueChange={(v) => onMonthChange(Number(v))}
              style={styles.picker}
              dropdownIconColor="#4A90E2"
            >
              {MONTHS.map((m) => (
                <Picker.Item key={m} label={getMonthLabel(m, year).split(' ')[0]} value={m} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.pickerBox}>
          <Text style={styles.label}>Año</Text>
          <View style={styles.pickerWrap}>
            <Picker
              selectedValue={year}
              onValueChange={(v) => onYearChange(Number(v))}
              style={styles.picker}
              dropdownIconColor="#4A90E2"
            >
              {YEARS.map((y) => (
                <Picker.Item key={y} label={String(y)} value={y} />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      <View>
        <Text style={styles.label}>Categoría</Text>
        <View style={styles.pickerWrap}>
          <Picker
            selectedValue={category}
            onValueChange={(v) => onCategoryChange(String(v))}
            style={styles.picker}
            dropdownIconColor="#4A90E2"
          >
            <Picker.Item label="Todas las categorías" value="Todas" />
            {CATEGORIES.map((c) => (
              <Picker.Item key={c} label={c} value={c} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  pickerBox: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#777',
    marginBottom: 4,
  },
  pickerWrap: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    height: 54,
    color: '#333',
  },
});
