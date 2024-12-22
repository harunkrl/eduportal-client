import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const CourseCard = ({ course, onDelete }) => {
  const navigate = useNavigate();

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          boxShadow: 6
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {course.courseName}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Chip 
            icon={<PersonIcon />} 
            label={`${course.instructor?.firstName} ${course.instructor?.lastName}`}
            size="small"
            sx={{ mr: 1 }}
          />
          <Chip 
            label={`${course.credits} Kredi`}
            size="small"
            color="primary"
          />
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Button
          size="small"
          startIcon={<InfoIcon />}
          onClick={() => navigate(`/courses/${course.id}`)}
        >
          Detaylar
        </Button>
        <Box>
          <Button
            size="small"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/courses/edit/${course.id}`)}
            sx={{ mr: 1 }}
          >
            Düzenle
          </Button>
          <Button
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => onDelete(course.id)}
          >
            Sil
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default CourseCard;