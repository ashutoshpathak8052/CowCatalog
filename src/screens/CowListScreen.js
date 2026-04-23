import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { fetchCows, searchAndFilter } from '../services/cowService';
import { STATUSES, PENS } from '../utils/constants';
import { formatDate } from '../utils/helpers';
import { colors, fontSizes, fontWeights, spacing, radii } from '../utils/theme';
import StatusBadge from '../components/StatusBadge';
import FAB from '../components/FAB';
import EmptyState from '../components/EmptyState';
import ChipPicker from '../components/ChipPicker';

const SEARCH_PLACEHOLDER = 'Search by ear tag…';
const EMPTY_MESSAGE = 'No cows match your search';
const FILTER_LABEL = '⚙ Filter';
const FILTER_ACTIVE_LABEL = '⚙ Filtered';
const CLEAR_LABEL = 'Clear filters';

const CowListScreen = ({ navigation }) => {
  const [cows, setCows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState(null);
  const [filterPen, setFilterPen] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      setLoading(true);
      fetchCows().then(data => {
        if (active) { setCows(data); setLoading(false); }
      });
      return () => { active = false; };
    }, []),
  );

  const filtered = searchAndFilter(cows, { search, status: filterStatus, pen: filterPen });
  const hasFilters = filterStatus || filterPen;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CowDetail', { cow: item })}
      activeOpacity={0.75}>
      <View style={styles.cardHeader}>
        <Text style={styles.earTag}>{item.earTag}</Text>
        <StatusBadge status={item.status} />
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.meta}>{item.sex} · {item.pen}</Text>
        <Text style={styles.date}>{formatDate(item.lastEventDate)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder={SEARCH_PLACEHOLDER}
          placeholderTextColor={colors.textPlaceholder}
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          style={[styles.filterBtn, hasFilters && styles.filterBtnActive]}
          onPress={() => setShowFilters(v => !v)}>
          <Text style={[styles.filterBtnText, hasFilters && styles.filterBtnTextActive]}>
            {hasFilters ? FILTER_ACTIVE_LABEL : FILTER_LABEL}
          </Text>
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={styles.filterPanel}>
          <ChipPicker label="Status" options={STATUSES} value={filterStatus} onChange={setFilterStatus} />
          <ChipPicker label="Pen" options={PENS} value={filterPen} onChange={setFilterPen} />
          {hasFilters && (
            <TouchableOpacity onPress={() => { setFilterStatus(null); setFilterPen(null); }}>
              <Text style={styles.clearFilters}>{CLEAR_LABEL}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color={colors.primary} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={filtered.length === 0 ? styles.emptyContainer : styles.list}
          ListEmptyComponent={<EmptyState message={EMPTY_MESSAGE} />}
        />
      )}

      <FAB onPress={() => navigation.navigate('AddCow')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchRow: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 5,
    fontSize: fontSizes.base,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.textSecondary,
  },
  filterBtn: {
    borderWidth: 1,
    borderColor: colors.borderChip,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  filterBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterBtnText: {
    fontSize: fontSizes.md,
    color: colors.textFilterBtn,
  },
  filterBtnTextActive: {
    color: colors.surface,
    fontWeight: fontWeights.semibold,
  },
  filterPanel: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg - 2,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  clearFilters: {
    color: colors.primary,
    fontSize: fontSizes.md,
    marginTop: spacing.xs,
  },
  list: {
    padding: spacing.md,
    paddingBottom: spacing.fab,
  },
  emptyContainer: { flex: 1 },
  loader: { flex: 1 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg - 2,
    marginBottom: spacing.sm + 2,
    elevation: 2,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs + 2,
  },
  earTag: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  meta: {
    fontSize: fontSizes.md,
    color: colors.textMuted,
  },
  date: {
    fontSize: fontSizes.sm,
    color: colors.textFaint,
  },
});

export default CowListScreen;
