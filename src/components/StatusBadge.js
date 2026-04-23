import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { STATUS_COLORS } from '../utils/constants';
import { colors, fontSizes, fontWeights, spacing, radii } from '../utils/theme';

const StatusBadge = ({ status }) => (
  <View style={[styles.badge, { backgroundColor: STATUS_COLORS[status] || colors.badgeFallback }]}>
    <Text style={styles.text}>{status}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs - 1,
    borderRadius: radii.badge,
    alignSelf: 'flex-start',
  },
  text: {
    color: colors.surface,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
  },
});

export default StatusBadge;
