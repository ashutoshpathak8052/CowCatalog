import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MOCK_EVENTS } from '../storage/mockData';
import { formatDate } from '../utils/helpers';
import { colors, fontSizes, fontWeights, spacing, radii } from '../utils/theme';
import StatusBadge from '../components/StatusBadge';

const EVENT_ICONS = {
  'Weight Check': '⚖️',
  Moved: '🚚',
  Treatment: '💊',
  Vaccination: '💉',
  default: '📋',
};

const SECTION_DETAILS = 'Details';
const SECTION_TIMELINE = 'Event Timeline';
const FALLBACK_VALUE = '—';
const WEIGHT_UNIT = 'kg';
const GAIN_UNIT = 'kg/day';
const DAYS_UNIT = 'days';

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value ?? FALLBACK_VALUE}</Text>
  </View>
);

const CowDetailScreen = ({ route }) => {
  const { cow } = route.params;

  const daysSinceCreated = Math.max(
    1,
    Math.floor((new Date() - new Date(cow.createdAt)) / (1000 * 60 * 60 * 24)),
  );
  const dailyGain = cow.weight ? (cow.weight * 0.003).toFixed(2) : null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerCard}>
        <Text style={styles.earTag}>{cow.earTag}</Text>
        <StatusBadge status={cow.status} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{SECTION_DETAILS}</Text>
        <InfoRow label="Sex" value={cow.sex} />
        <InfoRow label="Pen" value={cow.pen} />
        <InfoRow label="Weight" value={cow.weight ? `${cow.weight} ${WEIGHT_UNIT}` : null} />
        <InfoRow label="Daily Weight Gain" value={dailyGain ? `~${dailyGain} ${GAIN_UNIT}` : null} />
        <InfoRow label="Last Event" value={formatDate(cow.lastEventDate)} />
        <InfoRow label="Registered" value={formatDate(cow.createdAt)} />
        <InfoRow label="Days on Record" value={`${daysSinceCreated} ${DAYS_UNIT}`} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{SECTION_TIMELINE}</Text>
        {MOCK_EVENTS.map((event, index) => (
          <View key={event.id} style={styles.timelineItem}>
            <View style={styles.timelineLine}>
              <View style={styles.dot} />
              {index < MOCK_EVENTS.length - 1 && <View style={styles.line} />}
            </View>
            <View style={styles.timelineContent}>
              <Text style={styles.eventType}>
                {EVENT_ICONS[event.type] || EVENT_ICONS.default} {event.type}
              </Text>
              <Text style={styles.eventNote}>{event.note}</Text>
              <Text style={styles.eventDate}>{formatDate(event.date)}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.huge,
  },
  headerCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
    elevation: 2,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  earTag: {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.extrabold,
    color: colors.textPrimary,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    elevation: 2,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.bold,
    color: colors.primary,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs + 3,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderFaint,
  },
  infoLabel: {
    fontSize: fontSizes.base,
    color: colors.textMuted,
  },
  infoValue: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    color: colors.textSecondary,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  timelineLine: {
    alignItems: 'center',
    width: 20,
    marginRight: spacing.md,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: radii.sm,
    backgroundColor: colors.primary,
    marginTop: spacing.xs,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: colors.timelineLine,
    marginTop: 2,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: spacing.lg,
  },
  eventType: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.bold,
    color: colors.textSecondary,
  },
  eventNote: {
    fontSize: fontSizes.md,
    color: colors.textMuted,
    marginTop: 2,
  },
  eventDate: {
    fontSize: fontSizes.sm,
    color: colors.textFaint,
    marginTop: spacing.xs - 1,
  },
});

export default CowDetailScreen;
