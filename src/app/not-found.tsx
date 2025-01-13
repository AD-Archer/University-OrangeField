import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h4">Page Not Found</Typography>
      <Button component={Link} href="/" variant="contained">
        Return Home
      </Button>
    </Box>
  );
} 