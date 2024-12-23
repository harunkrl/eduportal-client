import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { courseApi } from '../../services/api';
import useApiCall from '../../hooks/useApiCall';
import { useNotification } from '../../context/NotificationContext';
import CourseCard from './CourseCard';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const { loading, error, execute } = useApiCall();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await execute(courseApi.getAll);
      setCourses(response.data || []);
    } catch (err) {
      showNotification('Dersler yüklenirken bir hata oluştu.', 'error');
    }
  };

  const handleDelete = async (id) => {
    const courseToDelete = courses.find(c => c.id === id);
    if (window.confirm(`${courseToDelete.courseName} dersini silmek istediğinizden emin misiniz?`)) {
      try {
        await execute(courseApi.delete, id);
        showNotification(`${courseToDelete.courseName} dersi başarıyla silindi.`, 'success');
        loadCourses();
      } catch (err) {
        showNotification('Ders silinirken bir hata oluştu.', 'error');
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Dersler
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/courses/create')}
        >
          Yeni Ders
        </Button>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && courses.length === 0 && (
        <Alert severity="info">
          Henüz ders bulunmamaktadır.
        </Alert>
      )}

      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseCard course={course} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CourseList;