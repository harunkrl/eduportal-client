import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  NavigateNext as NavigateNextIcon
} from '@mui/icons-material';
import { courseApi, instructorApi } from '../../services/api';
import useApiCall from '../../hooks/useApiCall';
import { useNotification } from '../../context/NotificationContext';

const CourseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, execute } = useApiCall();
  const { showNotification } = useNotification();

  const [instructors, setInstructors] = useState([]);
  const [formData, setFormData] = useState({
    courseName: '',
    credits: '',
    instructorId: ''
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    loadInstructors();
    if (id) {
      loadCourse();
    }
  }, [id]);

  const loadInstructors = async () => {
    try {
      const response = await execute(instructorApi.getAll);
      setInstructors(response.data || []);
    } catch (err) {
      showNotification('Akademisyen listesi yüklenirken bir hata oluştu.', 'error');
    }
  };

  const loadCourse = async () => {
    try {
      const response = await execute(courseApi.getById, id);
      const course = response.data;
      setFormData({
        courseName: course.courseName,
        credits: course.credits,
        instructorId: course.instructor.id
      });
    } catch (err) {
      showNotification('Ders bilgileri yüklenirken bir hata oluştu.', 'error');
      navigate('/courses');
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.courseName.trim()) {
      errors.courseName = 'Ders adı zorunludur';
    }
    if (!formData.credits) {
      errors.credits = 'Kredi sayısı zorunludur';
    } else if (formData.credits < 1) {
      errors.credits = 'Kredi sayısı 1\'den küçük olamaz';
    }
    if (!formData.instructorId) {
      errors.instructorId = 'Akademisyen seçimi zorunludur';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showNotification('Lütfen tüm zorunlu alanları doldurun.', 'warning');
      return;
    }

    try {
      if (id) {
        await execute(courseApi.update, id, formData);
        showNotification(`${formData.courseName} dersi başarıyla güncellendi.`, 'success');
      } else {
        await execute(courseApi.create, formData);
        showNotification(`${formData.courseName} dersi başarıyla oluşturuldu.`, 'success');
      }
      navigate('/courses');
    } catch (err) {
      showNotification('İşlem sırasında bir hata oluştu.', 'error');
    }
  };

  return (
    <Container maxWidth="md">
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
          <Typography color="text.primary">
            {id ? 'Ders Düzenle' : 'Yeni Ders'}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {id ? 'Ders Düzenle' : 'Yeni Ders'}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Ders Adı"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            error={!!formErrors.courseName}
            helperText={formErrors.courseName}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Kredi"
            name="credits"
            type="number"
            value={formData.credits}
            onChange={handleChange}
            error={!!formErrors.credits}
            helperText={formErrors.credits}
            margin="normal"
            required
            inputProps={{ min: 1 }}
          />

          <TextField
            fullWidth
            select
            label="Akademisyen"
            name="instructorId"
            value={formData.instructorId}
            onChange={handleChange}
            error={!!formErrors.instructorId}
            helperText={formErrors.instructorId}
            margin="normal"
            required
          >
            <MenuItem value="">
              <em>Seçiniz</em>
            </MenuItem>
            {instructors.map((instructor) => (
              <MenuItem key={instructor.id} value={instructor.id}>
                {`${instructor.firstName} ${instructor.lastName}`}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              type="button"
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={() => navigate('/courses')}
            >
              İptal
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
              disabled={loading}
            >
              {loading ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 1 }} />
                  Kaydediliyor...
                </>
              ) : (
                'Kaydet'
              )}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CourseForm;