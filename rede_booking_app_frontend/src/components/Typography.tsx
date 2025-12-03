import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { Theme } from '../theme';

type Variant = 'h1' | 'h2' | 'h3' | 'body' | 'small' | 'tiny';

export interface TypographyProps extends TextProps {
  variant?: Variant;
  color?: string;
  weight?: 'regular' | 'medium' | 'bold';
  children: React.ReactNode;
}

// PUBLIC_INTERFACE
export function T({
  variant = 'body',
  color = Theme.colors.text,
  weight = 'regular',
  style,
  children,
  ...rest
}: TypographyProps) {
  return (
    <Text
      {...rest}
      style={[
        styles.base,
        styles[variant],
        { color },
        weightStyles[weight],
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: Theme.typography.fontFamily.regular,
  },
  h1: {
    fontSize: Theme.typography.h1,
    lineHeight: Theme.typography.h1 * Theme.typography.lhNormal,
  },
  h2: {
    fontSize: Theme.typography.h2,
    lineHeight: Theme.typography.h2 * Theme.typography.lhNormal,
  },
  h3: {
    fontSize: Theme.typography.h3,
    lineHeight: Theme.typography.h3 * Theme.typography.lhNormal,
  },
  body: {
    fontSize: Theme.typography.body,
    lineHeight: Theme.typography.body * Theme.typography.lhRelaxed,
  },
  small: {
    fontSize: Theme.typography.small,
    lineHeight: Theme.typography.small * Theme.typography.lhRelaxed,
  },
  tiny: {
    fontSize: Theme.typography.tiny,
    lineHeight: Theme.typography.tiny * Theme.typography.lhRelaxed,
  },
});

const weightStyles = StyleSheet.create({
  regular: { fontWeight: '400' },
  medium: { fontWeight: '600' },
  bold: { fontWeight: '700' },
});
