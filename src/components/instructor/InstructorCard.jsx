import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Avatar,
  Chip,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
  Email as EmailIcon,
  School as SchoolIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const InstructorCard = ({ instructor, onDelete }) => {
  const navigate = useNavigate();

  const getInitials = () => {
    return `${instructor.firstName.charAt(0)}${instructor.lastName.charAt(0)}`;
  };

  const getRandomColor = () => {
    const colors = [
      '#1976d2', // blue
      '#2e7d32', // green
      '#9c27b0', // purple
      '#d32f2f', // red
      '#ed6c02', // orange
      '#0288d1', // light blue
    ];
    return colors[instructor.id % colors.length];
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar 
            sx={{ 
              width: 80, 
              height: 80, 
              bgcolor: getRandomColor(),
              fontSize: '1.5rem',
              mb: 2
            }}
          >
            {getInitials()}
          </Avatar>
          <Typography variant="h6" component="h2" align="center" gutterBottom>
            {`${instructor.firstName} ${instructor.lastName}`}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <EmailIcon sx={{ color: 'action.active', mr: 1, fontSize: 20 }} />
          <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-word' }}>
            {instructor.email}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SchoolIcon sx={{ color: 'action.active', mr: 1, fontSize: 20 }} />
          <Typography variant="body2" color="text.secondary">
            {instructor.department}
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Chip
            icon={<PersonIcon />}
            label="Akademisyen"
            size="small"
            color="primary"
            variant="outlined"
          />
        </Box>
      </CardContent>

      <Divider />

      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Box>
          <Tooltip title="Detaylar">
            <IconButton
              size="small"
              color="info"
              onClick={() => navigate(`/instructors/${instructor.id}`)}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Düzenle">
            <IconButton
              size="small"
              color="primary"
              onClick={() => navigate(`/instructors/edit/${instructor.id}`)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Sil">
            <IconButton
              size="small"
              color="error"
              onClick={() => onDelete(instructor.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
};

export default InstructorCard;