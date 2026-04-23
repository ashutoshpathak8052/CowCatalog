import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors, fontSizes, fontWeights, spacing, radii } from '../utils/theme';

const ChipPicker = ({ label, options, value, onChange }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {options.map(opt => (
        <TouchableOpacity
          key={opt}
          style={[styles.chip, value === opt && styles.chipActive]}
          onPress={() => onChange(value === opt ? null : opt)}
          activeOpacity={0.7}>
          <Text style={[styles.chipText, value === opt && styles.chipTextActive]}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: spacing.md },
  label: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    color: colors.textLabel,
    marginBottom: spacing.xs + 2,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.borderChip,
    borderRadius: radii.chip,
    paddingHorizontal: spacing.lg - 2,
    paddingVertical: spacing.xs + 3,
    marginRight: spacing.sm,
    backgroundColor: colors.surface,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: fontSizes.md,
    color: colors.textChip,
  },
  chipTextActive: {
    color: colors.surface,
    fontWeight: fontWeights.semibold,
  },
});

export default ChipPicker;
