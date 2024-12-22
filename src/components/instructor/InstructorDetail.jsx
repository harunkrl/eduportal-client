import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Avatar,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import {
  Edit as EditIcon,
  ArrowBack as ArrowBackIcon,
  NavigateNext as NavigateNextIcon,
  Email as EmailIcon,
  School as SchoolIcon,
  MenuBook as MenuBookIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';
import { instructorApi } from '../../services/api';
import useApiCall from '../../hooks/useApiCall';
import { useNotification } from '../../context/NotificationContext';

const InstructorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, execute } = useApiCall();
  const { showNotification } = useNotification();
  
  const [instructor, setInstructor] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadInstructor();
    loadCourses();
  }, [id]);

  const loadInstructor = async () => {
    try {
      const response = await execute(instructorApi.getById, id);
      setInstructor(response.data);
    } catch (err) {
      showNotification('Akademisyen bilgileri yüklenirken bir hata oluştu.', 'error', 4000);
      navigate('/instructors');
    }
  };

  const loadCourses = async () => {
    try {
      const response = await execute(instructorApi.getCourses, id);
      setCourses(response.data || []);
    } catch (err) {
      showNotification('Ders listesi yüklenirken bir hata oluştu.', 'error', 4000);
    }
  };

  const getInitials = () => {
    if (!instructor) return '';
    return `${instructor.firstName.charAt(0)}${instructor.lastName.charAt(0)}`;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!instructor) return null;

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link
            color="inherit"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/instructors');
            }}
          >
            Akademisyenler
          </Link>
          <Typography color="text.primary">
            {`${instructor.firstName} ${instructor.lastName}`}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 2,
                bgcolor: 'primary.main',
                fontSize: '2.5rem'
              }}
            >
              {getInitials()}
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {`${instructor.firstName} ${instructor.lastName}`}
            </Typography>
            <Chip
              icon={<PersonIcon />}
              label="Akademisyen"
              color="primary"
              sx={{ mb: 2 }}
            />
            <List sx={{ width: '100%' }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.light' }}>
                    <EmailIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="E-posta"
                  secondary={instructor.email}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'secondary.light' }}>
                    <SchoolIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Bölüm"
                  secondary={instructor.department}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'success.light' }}>
                    <MenuBookIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Verdiği Dersler"
                  secondary={`${courses.length} Ders`}
                />
              </ListItem>
            </List>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => navigate(`/instructors/edit/${id}`)}
                fullWidth
              >
                Düzenle
              </Button>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/instructors')}
                sx={{ mt: 1 }}
                fullWidth
              >
                Geri Dön
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AssignmentIcon color="primary" />
              Verdiği Dersler
            </Typography>
            <Divider sx={{ my: 2 }} />
            
            {courses.length === 0 ? (
              <Alert severity="info">
                Henüz ders kaydı bulunmamaktadır.
              </Alert>
            ) : (
              <Grid container spacing={2}>
                {courses.map((course) => (
                  <Grid item xs={12} sm={6} key={course.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {course.courseName}
                        </Typography>
                        <Typography color="text.secondary" gutterBottom>
                          {course.credits} Kredi
                        </Typography>
                        <Chip
                          size="small"
                          label={`${course.students?.length || 0} Öğrenci`}
                          color="primary"
                          variant="outlined"
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              İstatistikler
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {courses.length}
                  </Typography>
                  <Typography color="text.secondary">
                    Toplam Ders
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="secondary">
                    {courses.reduce((sum, course) => sum + (course.students?.length || 0), 0)}
                  </Typography>
                  <Typography color="text.secondary">
                    Toplam Öğrenci
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">
                    {courses.reduce((sum, course) => sum + course.credits, 0)}
                  </Typography>
                  <Typography color="text.secondary">
                    Toplam Kredi
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InstructorDetails;