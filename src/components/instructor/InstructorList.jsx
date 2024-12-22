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
  InputAdornment
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { instructorApi } from '../../services/api';
import useApiCall from '../../hooks/useApiCall';
import { useNotification } from '../../context/NotificationContext';
import InstructorCard from './InstructorCard';

const InstructorList = () => {
  const [instructors, setInstructors] = useState([]);
  const [filteredInstructors, setFilteredInstructors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, error, execute } = useApiCall();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    loadInstructors();
  }, []);

  useEffect(() => {
    filterInstructors();
  }, [searchTerm, instructors]);

  const loadInstructors = async () => {
    try {
      const response = await execute(instructorApi.getAll);
      setInstructors(response.data || []);
    } catch (err) {
      showNotification('Akademisyenler yüklenirken hata oluştu', 'error');
    }
  };

  const filterInstructors = () => {
    const filtered = instructors.filter(instructor => 
      `${instructor.firstName} ${instructor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInstructors(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu akademisyeni silmek istediğinizden emin misiniz?')) {
      try {
        await execute(instructorApi.delete, id);
        showNotification('Akademisyen başarıyla silindi');
        loadInstructors();
      } catch (err) {
        showNotification('Silme işlemi başarısız oldu', 'error');
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Akademisyenler
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/instructors/create')}
        >
          Yeni Akademisyen
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ad, soyad, bölüm veya e-posta ile arama yapın..."
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

      {!loading && !error && filteredInstructors.length === 0 && (
        <Alert severity="info">
          {searchTerm ? 'Arama kriterlerine uygun akademisyen bulunamadı.' : 'Henüz akademisyen bulunmamaktadır.'}
        </Alert>
      )}

      <Grid container spacing={3}>
        {filteredInstructors.map((instructor) => (
          <Grid item xs={12} sm={6} md={4} key={instructor.id}>
            <InstructorCard instructor={instructor} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default InstructorList;