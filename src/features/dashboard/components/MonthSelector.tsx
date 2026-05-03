import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { getMonthLabel } from '../../../shared/utils/formatters';

interface MonthSelectorProps {
  month: number;
  year: number;
  onPrev: () => void;
  onNext: () => void;
}

export function MonthSelector({ month, year, onPrev, onNext }: MonthSelectorProps) {
  const isCurrentMonth =
    month === new Date().getMonth() && year === new Date().getFullYear();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrev} style={styles.arrow}>
        <ChevronLeft color="#4A90E2" size={26} />
      </TouchableOpacity>
      <Text style={styles.label}>{getMonthLabel(month, year)}</Text>
      <TouchableOpacity onPress={onNext} style={styles.arrow} disabled={isCurrentMonth}>
        <ChevronRight color={isCurrentMonth ? '#ccc' : '#4A90E2'} size={26} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 16,
  },
  arrow: {
    padding: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A2E',
    minWidth: 150,
    textAlign: 'center',
  },
});
