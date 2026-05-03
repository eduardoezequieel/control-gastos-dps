import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../shared/hooks/useAuth';
import { useDashboard } from '../hooks/useDashboard';
import { MonthSelector } from '../components/MonthSelector';
import { MonthlySummary } from '../components/MonthlySummary';
import { RecentExpenses } from '../components/RecentExpenses';

export function DashboardScreen() {
  const { user, logout } = useAuth();
  const { expenses, recentExpenses, total, selectedMonth, selectedYear, loading, changeMonth, refetch } =
    useDashboard();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hola</Text>
            <Text style={styles.email} numberOfLines={1}>
              {user?.displayName ?? user?.email}
            </Text>
          </View>
          <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Salir</Text>
          </TouchableOpacity>
        </View>

        <MonthSelector
          month={selectedMonth}
          year={selectedYear}
          onPrev={() => changeMonth('prev')}
          onNext={() => changeMonth('next')}
        />

        <MonthlySummary total={total} expenses={expenses} />

        <RecentExpenses expenses={recentExpenses} />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 13,
    color: '#999',
  },
  email: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    maxWidth: 220,
  },
  logoutBtn: {
    backgroundColor: '#F0F4FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  logoutText: {
    color: '#4A90E2',
    fontWeight: '600',
    fontSize: 14,
  },
});
