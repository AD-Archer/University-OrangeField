'use client';

import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useAppTheme } from './utils';

export default function ColorModeSelect(props: any) {
  const { mode, toggleColorMode } = useAppTheme();

  return (
    <IconButton onClick={toggleColorMode} color="inherit" {...props}>
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
} 