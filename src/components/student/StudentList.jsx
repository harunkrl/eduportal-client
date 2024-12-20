import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  Select,
  InputLabel
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import { studentApi } from '../../services/api';
import useApiCall from '../../hooks/useApiCall';
import { useNotification } from '../../context/NotificationContext';
import StudentCard from './StudentCard';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [majorFilter, setMajorFilter] = useState('');
  const [majors, setMajors] = useState([]);
  const { loading, error, execute } = useApiCall();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [searchTerm, majorFilter, students]);

  useEffect(() => {
    const uniqueMajors = [...new Set(students.map(student => student.major))];
    setMajors(uniqueMajors);
  }, [students]);

  const loadStudents = async () => {
    try {
      const response = await execute(studentApi.getAll);
      setStudents(response.data || []);
    } catch (err) {
      showNotification('Öğrenciler yüklenirken hata oluştu', 'error');
    }
  };

  const filterStudents = () => {
    let filtered = students;

    if (searchTerm) {
      filtered = filtered.filter(student =>
        `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (majorFilter) {
      filtered = filtered.filter(student => student.major === majorFilter);
    }

    setFilteredStudents(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu öğrenciyi silmek istediğinizden emin misiniz?')) {
      try {
        await execute(studentApi.delete, id);
        showNotification('Öğrenci başarıyla silindi');
        loadStudents();
      } catch (err) {
        showNotification('Silme işlemi başarısız oldu', 'error');
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Öğrenciler
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/students/create')}
        >
          Yeni Öğrenci
        </Button>
      </Box>

      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          sx={{ flexGrow: 1 }}
          variant="outlined"
          placeholder="Ad, soyad veya e-posta ile arama yapın..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="major-filter-label">
            <FilterListIcon sx={{ mr: 1 }} />
            Bölüm Filtresi
          </InputLabel>
          <Select
            labelId="major-filter-label"
            value={majorFilter}
            label="Bölüm Filtresi"
            onChange={(e) => setMajorFilter(e.target.value)}
          >
            <MenuItem value="">Tümü</MenuItem>
            {majors.map((major) => (
              <MenuItem key={major} value={major}>
                {major}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

      {!loading && !error && filteredStudents.length === 0 && (
        <Alert severity="info">
          {searchTerm || majorFilter ? 'Arama kriterlerine uygun öğrenci bulunamadı.' : 'Henüz öğrenci bulunmamaktadır.'}
        </Alert>
      )}

      <Grid container spacing={3}>
        {filteredStudents.map((student) => (
          <Grid item xs={12} sm={6} md={4} key={student.id}>
            <StudentCard student={student} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>

      {filteredStudents.length > 0 && (
        <Box sx={{ mt: 2, textAlign: 'right' }}>
          <Typography variant="body2" color="text.secondary">
            Toplam {filteredStudents.length} öğrenci gösteriliyor
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default StudentList;