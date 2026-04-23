import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSizes, spacing } from '../utils/theme';

const EMOJI = '🐄';
const DEFAULT_MESSAGE = 'No cows found';

const EmptyState = ({ message = DEFAULT_MESSAGE }) => (
  <View style={styles.container}>
    <Text style={styles.emoji}>{EMOJI}</Text>
    <Text style={styles.message}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emoji: {
    fontSize: fontSizes.emoji,
    marginBottom: spacing.md,
  },
  message: {
    fontSize: fontSizes.xl,
    color: colors.textFaint,
  },
});

export default EmptyState;
