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
  Tooltip,
  Stack
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
  Email as EmailIcon,
  School as SchoolIcon,
  MenuBook as MenuBookIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const StudentCard = ({ student, onDelete }) => {
  const navigate = useNavigate();

  const getInitials = () => {
    return `${student.firstName.charAt(0)}${student.lastName.charAt(0)}`;
  };

  const getRandomColor = () => {
    const colors = [
      '#2196f3', // blue
      '#4caf50', // green
      '#ff9800', // orange
      '#e91e63', // pink
      '#9c27b0', // purple
      '#00bcd4', // cyan
    ];
    return colors[student.id % colors.length];
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.shadows[8]
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, pt: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          mb: 2,
          position: 'relative'
        }}>
          <Avatar 
            sx={{ 
              width: 80, 
              height: 80, 
              bgcolor: getRandomColor(),
              fontSize: '1.5rem',
              mb: 2,
              boxShadow: 2
            }}
          >
            {getInitials()}
          </Avatar>
          <Typography variant="h6" component="h2" align="center" gutterBottom>
            {`${student.firstName} ${student.lastName}`}
          </Typography>
          <Chip
            icon={<PersonIcon />}
            label="Öğrenci"
            size="small"
            color="primary"
            variant="outlined"
            sx={{ position: 'absolute', top: -10, right: -10 }}
          />
        </Box>

        <Stack spacing={1.5} sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmailIcon sx={{ color: 'action.active', fontSize: 20 }} />
            <Typography variant="body2" color="text.secondary" sx={{ 
              wordBreak: 'break-word',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {student.email}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SchoolIcon sx={{ color: 'action.active', fontSize: 20 }} />
            <Typography variant="body2" color="text.secondary">
              {student.major}
            </Typography>
          </Box>

          {student.coursesSelected && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <MenuBookIcon sx={{ color: 'action.active', fontSize: 20 }} />
              <Typography variant="body2" color="text.secondary">
                {student.coursesSelected.length} Ders Alıyor
              </Typography>
            </Box>
          )}
        </Stack>
      </CardContent>

      <Divider />

      <CardActions sx={{ 
        justifyContent: 'space-between', 
        p: 2,
        bgcolor: (theme) => theme.palette.grey[50]
      }}>
        <Box>
          <Tooltip title="Detaylar">
            <IconButton
              size="small"
              color="info"
              onClick={() => navigate(`/students/${student.id}`)}
              sx={{ 
                '&:hover': { 
                  bgcolor: 'info.light',
                  color: 'white'
                }
              }}
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
              onClick={() => navigate(`/students/edit/${student.id}`)}
              sx={{ 
                '&:hover': { 
                  bgcolor: 'primary.light',
                  color: 'white'
                }
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Sil">
            <IconButton
              size="small"
              color="error"
              onClick={() => onDelete(student.id)}
              sx={{ 
                '&:hover': { 
                  bgcolor: 'error.light',
                  color: 'white'
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>

      {student.coursesSelected && student.coursesSelected.length > 0 && (
        <Box sx={{ p: 2, pt: 0 }}>
          <Typography variant="caption" color="text.secondary">
            Son Kayıtlı Ders: {student.coursesSelected[student.coursesSelected.length - 1].courseName}
          </Typography>
        </Box>
      )}
    </Card>
  );
};

export default StudentCard;