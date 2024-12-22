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
  ListItemSecondaryAction,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  NavigateNext as NavigateNextIcon,
  Email as EmailIcon,
  School as SchoolIcon,
  MenuBook as MenuBookIcon,
  Person as PersonIcon,
  Add as AddIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';
import { studentApi, courseApi } from '../../services/api';
import useApiCall from '../../hooks/useApiCall';
import { useNotification } from '../../context/NotificationContext';

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, execute } = useApiCall();
  const { showNotification } = useNotification();
  
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  useEffect(() => {
    loadStudent();
    loadCourses();
    loadAvailableCourses();
  }, [id]);

  const loadStudent = async () => {
    try {
      const response = await execute(studentApi.getById, id);
      setStudent(response.data);
    } catch (err) {
      showNotification('Öğrenci bilgileri yüklenemedi', 'error');
      navigate('/students');
    }
  };

  const loadCourses = async () => {
    try {
      const response = await execute(studentApi.getCourses, id);
      setCourses(response.data || []);
    } catch (err) {
      showNotification('Ders listesi yüklenemedi', 'error');
    }
  };

  const loadAvailableCourses = async () => {
    try {
      const response = await execute(courseApi.getAll);
      setAvailableCourses(response.data || []);
    } catch (err) {
      showNotification('Mevcut dersler yüklenemedi', 'error');
    }
  };

  const handleEnrollCourse = async () => {
    if (!selectedCourse) return;
    
    try {
      await execute(studentApi.enrollCourse, id, selectedCourse);
      showNotification('Derse kayıt başarılı');
      loadCourses();
      setOpenDialog(false);
      setSelectedCourse('');
    } catch (err) {
      showNotification('Derse kayıt başarısız oldu', 'error');
    }
  };

  const handleDropCourse = async (courseId) => {
    if (window.confirm('Bu dersi bırakmak istediğinizden emin misiniz?')) {
      try {
        await execute(studentApi.dropCourse, id, courseId);
        showNotification('Ders kaydı silindi');
        loadCourses();
      } catch (err) {
        showNotification('Ders kaydı silinemedi', 'error');
      }
    }
  };

  const getInitials = () => {
    if (!student) return '';
    return `${student.firstName.charAt(0)}${student.lastName.charAt(0)}`;
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

  if (!student) return null;

  const availableCoursesForEnrollment = availableCourses.filter(
    course => !courses.find(c => c.id === course.id)
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link
            color="inherit"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate('/students');
            }}
          >
            Öğrenciler
          </Link>
          <Typography color="text.primary">
            {`${student.firstName} ${student.lastName}`}
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
              {`${student.firstName} ${student.lastName}`}
            </Typography>
            <Chip
              icon={<PersonIcon />}
              label="Öğrenci"
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
                  secondary={student.email}
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
                  secondary={student.major}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'success.light' }}>
                    <MenuBookIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Aldığı Dersler"
                  secondary={`${courses.length} Ders`}
                />
              </ListItem>
            </List>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => navigate(`/students/edit/${id}`)}
                fullWidth
              >
                Düzenle
              </Button>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/students')}
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AssignmentIcon color="primary" />
                Aldığı Dersler
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenDialog(true)}
                disabled={availableCoursesForEnrollment.length === 0}
              >
                Ders Ekle
              </Button>
            </Box>
            <Divider sx={{ my: 2 }} />
            
            {courses.length === 0 ? (
              <Alert severity="info">
                Henüz ders kaydı bulunmamaktadır.
              </Alert>
            ) : (
              <Grid container spacing={2}>
                {courses.map((course) => (
                  <Grid item xs={12} key={course.id}>
                    <Card variant="outlined">
                      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="h6">
                            {course.courseName}
                          </Typography>
                          <Typography color="text.secondary" gutterBottom>
                            {course.instructor.firstName} {course.instructor.lastName}
                          </Typography>
                          <Chip
                            size="small"
                            label={`${course.credits} Kredi`}
                            color="primary"
                            variant="outlined"
                          />
                        </Box>
                        <IconButton
                          color="error"
                          onClick={() => handleDropCourse(course.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
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
                    {courses.reduce((sum, course) => sum + course.credits, 0)}
                  </Typography>
                  <Typography color="text.secondary">
                    Toplam Kredi
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">
                    {courses.length > 0 ? (courses.reduce((sum, course) => sum + course.credits, 0) / courses.length).toFixed(1) : '0'}
                  </Typography>
                  <Typography color="text.secondary">
                    Ortalama Kredi
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Yeni Ders Kaydı</DialogTitle>
        <DialogContent sx={{ minWidth: 400 }}>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Ders Seçin</InputLabel>
            <Select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              label="Ders Seçin"
            >
              {availableCoursesForEnrollment.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.courseName} - {course.instructor.firstName} {course.instructor.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>İptal</Button>
          <Button 
            onClick={handleEnrollCourse}
            variant="contained"
            disabled={!selectedCourse}
          >
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StudentDetails;