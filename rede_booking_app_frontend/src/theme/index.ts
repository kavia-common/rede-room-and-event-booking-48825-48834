import { Colors } from './colors';
import { Typography } from './typography';

export const Theme = {
  colors: Colors,
  typography: Typography,
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  spacing: (n: number) => n * 8,
  shadow: {
    // subtle shadow for modern look
    card: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 2,
    },
  },
};

export type ThemeType = typeof Theme;
