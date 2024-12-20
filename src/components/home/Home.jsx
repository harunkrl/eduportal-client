import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Container
} from '@mui/material';
import {
  School as SchoolIcon,
  Person as PersonIcon,
  Book as BookIcon
} from '@mui/icons-material';

const features = [
  {
    title: 'Akademisyenler',
    description: 'Akademisyen listesini görüntüleyin ve yönetin.',
    icon: <PersonIcon sx={{ fontSize: 40 }} />,
    path: '/instructors',
    color: '#1976d2'
  },
  {
    title: 'Dersler',
    description: 'Ders programını görüntüleyin ve yönetin.',
    icon: <BookIcon sx={{ fontSize: 40 }} />,
    path: '/courses',
    color: '#9c27b0'
  },
  {
    title: 'Öğrenciler',
    description: 'Öğrenci listesini görüntüleyin ve yönetin.',
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    path: '/students',
    color: '#2e7d32'
  }
];

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 2
          }}
        >
          EduPortal'a Hoş Geldiniz
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Eğitim yönetim sistemimiz ile öğrenci ve akademisyen süreçlerinizi kolayca yönetin.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {features.map((feature) => (
          <Grid item xs={12} md={4} key={feature.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box
                  sx={{
                    bgcolor: `${feature.color}15`,
                    color: feature.color,
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography gutterBottom variant="h5" component="h2">
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button
                  component={RouterLink}
                  to={feature.path}
                  variant="contained"
                  color="primary"
                >
                  Görüntüle
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;