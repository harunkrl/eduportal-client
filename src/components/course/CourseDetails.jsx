import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link,
  Card,
  CardContent
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  NavigateNext as NavigateNextIcon,
  Email as EmailIcon,
  Class as ClassIcon
} from '@mui/icons-material';
import { courseApi } from '../../services/api';
import useApiCall from '../../hooks/useApiCall';
import { useNotification } from '../../context/NotificationContext';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, execute } = useApiCall();
  const { showNotification } = useNotification();
  
  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadCourse();
    loadStudents();
  }, [id]);

  const loadCourse = async () => {
    try {
      const response = await execute(courseApi.getById, id);
      setCourse(response.data);
    } catch (err) {
      showNotification('Ders bilgileri yüklenemedi', 'error');
      navigate('/courses');
    }
  };

  const loadStudents = async () => {
    try {
      const response = await execute(courseApi.getStudents, id);
      setStudents(response.data || []);
    } catch (err) {
      showNotification('Öğrenci listesi yüklenemedi', 'error');
    }
  };

  const handleRemoveStudent = async (studentId) => {
    if (window.confirm('Bu öğrenciyi dersten çıkarmak istediğinizden emin misiniz?')) {
      try {
        await execute(courseApi.removeStudent, id, studentId);
        showNotification('Öğrenci dersten çıkarıldı');
        loadStudents();
      } catch (err) {
        showNotification('İşlem başarısız oldu', 'error');
      }
    }
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
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!course) return null;

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link
            color="inherit"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/courses');
            }}
          >
            Dersler
          </Link>
          <Typography color="text.primary">{course.courseName}</Typography>
        </Breadcrumbs>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" component="h1">
                {course.courseName}
              </Typography>
              <Box>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => navigate(`/courses/edit/${id}`)}
                  sx={{ mr: 1 }}
                >
                  Düzenle
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate('/courses')}
                >
                  Geri Dön
                </Button>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      <ClassIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Ders Bilgileri
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body1" gutterBottom>
                        <strong>Kredi:</strong> {course.credits}
                      </Typography>
                      <Chip
                        label={`${students.length} Öğrenci`}
                        color="primary"
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      <PersonIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Akademisyen Bilgileri
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body1" gutterBottom>
                        <strong>Ad Soyad:</strong> {`${course.instructor?.firstName} ${course.instructor?.lastName}`}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        <strong>E-posta:</strong> {course.instructor?.email}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              <SchoolIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Kayıtlı Öğrenciler
            </Typography>
            
            {students.length === 0 ? (
              <Alert severity="info" sx={{ mt: 2 }}>
                Bu derse henüz öğrenci kaydı yapılmamış.
              </Alert>
            ) : (
              <List>
                {students.map((student) => (
                  <ListItem
                    key={student.id}
                    divider
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveStudent(student.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={`${student.firstName} ${student.lastName}`}
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <EmailIcon fontSize="small" color="action" />
                          {student.email}
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              İstatistikler
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Toplam Öğrenci"
                  secondary={students.length}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Kredi"
                  secondary={course.credits}
                />
              </ListItem>
              {/* Diğer istatistikler eklenebilir */}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CourseDetails;