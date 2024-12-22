import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Stack
} from '@mui/material';
import { Warning, Refresh, Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

class ErrorBoundaryFallback extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

const ErrorFallback = ({ error }) => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: 'center',
          borderRadius: 2,
          bgcolor: 'background.paper'
        }}
      >
        <Warning color="error" sx={{ fontSize: 64, mb: 2 }} />
        
        <Typography variant="h4" gutterBottom color="error">
          Oops! Something went wrong
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          We're sorry, but something unexpected happened. Please try again later.
        </Typography>
        
        {error && process.env.NODE_ENV === 'development' && (
          <Box sx={{ mt: 2, mb: 4 }}>
            <Typography variant="subtitle2" color="error" sx={{ mb: 1 }}>
              Error Details (Development Only):
            </Typography>
            <Paper
              sx={{
                p: 2,
                bgcolor: 'grey.100',
                maxHeight: '200px',
                overflow: 'auto',
                textAlign: 'left'
              }}
            >
              <pre style={{ margin: 0 }}>
                {error.toString()}
              </pre>
            </Paper>
          </Box>
        )}
        
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ mt: 4 }}
        >
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={handleRefresh}
          >
            Try Again
          </Button>
          <Button
            variant="outlined"
            startIcon={<Home />}
            onClick={handleGoHome}
          >
            Go to Homepage
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ErrorBoundaryFallback;