import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, ActivityIndicator, View } from 'react-native';
import { Theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
}

// PUBLIC_INTERFACE
export function Button({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  fullWidth = true,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  if (variant === 'outline') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        style={[
          styles.outline,
          fullWidth && styles.fullWidth,
          isDisabled && styles.disabled,
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={Theme.colors.primary} />
        ) : (
          <Text style={[styles.text, { color: Theme.colors.primary }]}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  }

  const gradientColors =
    variant === 'secondary'
      ? [Theme.colors.secondary, '#FBBF24']
      : [Theme.colors.primary, '#3B82F6'];

  return (
    <TouchableOpacity onPress={onPress} disabled={isDisabled} style={[fullWidth && styles.fullWidth, style]}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.button, isDisabled && styles.disabled]}
      >
        <View>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={[styles.text, { color: '#fff' }]}>{title}</Text>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: Theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...Theme.shadow.card,
  },
  outline: {
    paddingVertical: 14,
    borderRadius: Theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.primary,
    backgroundColor: Theme.colors.surface,
  },
  text: {
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.6,
  },
  fullWidth: {
    width: '100%',
  },
});
