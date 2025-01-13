'use client';

import { useTheme } from '@mui/material/styles';
import { useColorMode } from './ColorModeContext';

export function useAppTheme() {
  const theme = useTheme();
  const { mode, toggleColorMode } = useColorMode();

  return {
    theme,
    mode,
    toggleColorMode,
  };
} 