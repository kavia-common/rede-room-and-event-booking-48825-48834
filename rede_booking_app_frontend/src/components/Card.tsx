import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Theme } from '../theme';

interface CardProps {
  style?: ViewStyle;
  children: React.ReactNode;
  padded?: boolean;
}

// PUBLIC_INTERFACE
export function Card({ style, children, padded = true }: CardProps) {
  return (
    <View style={[styles.card, padded && styles.padded, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Theme.colors.border,
    ...Theme.shadow.card,
  },
  padded: {
    padding: Theme.spacing(2),
  },
});
