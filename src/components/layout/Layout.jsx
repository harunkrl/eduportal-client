import React from 'react';
import { Box, CssBaseline, Container } from '@mui/material';
import Navbar from './Navbar';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../utils/theme';

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
          {children}
        </Container>
        <Box component="footer" sx={{ py: 3, bgcolor: 'primary.main', color: 'white', mt: 'auto' }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center' }}>
              © {new Date().getFullYear()} EduPortal - Eğitim Yönetim Sistemi
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;