'use client';

import { createContext, useContext } from 'react';

export const ColorModeContext = createContext({
  mode: 'light',
  toggleColorMode: () => {},
});

export const useColorMode = () => useContext(ColorModeContext); 