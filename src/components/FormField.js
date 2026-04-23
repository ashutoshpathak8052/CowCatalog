import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, fontSizes, fontWeights, spacing, radii } from '../utils/theme';

const FormField = ({ label, error, ...inputProps }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, error && styles.inputError]}
      placeholderTextColor={colors.textPlaceholder}
      {...inputProps}
    />
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: spacing.lg },
  label: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    color: colors.textLabel,
    marginBottom: spacing.xs + 2,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: fontSizes.lg,
    color: colors.textSecondary,
    backgroundColor: colors.inputBg,
  },
  inputError: { borderColor: colors.errorDark },
  error: {
    color: colors.errorDark,
    fontSize: fontSizes.sm,
    marginTop: spacing.xs,
  },
});

export default FormField;
