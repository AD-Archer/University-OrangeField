'use client';

import React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ColorModeSelect } from '../shared-theme';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Orange Field
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>
          <Button color="inherit" component={Link} href="/about">
            About
          </Button>
          <Button color="inherit" component={Link} href="/blog">
            Blog
          </Button>
          <Button color="inherit" component={Link} href="/sign-in">
            Sign In
          </Button>
          <Button color="inherit" component={Link} href="/sign-up">
            Sign Up
          </Button>
          <ColorModeSelect />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 