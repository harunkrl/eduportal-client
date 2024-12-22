import React, { useState, useEffect } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { studentApi, courseApi } from '../../services/api';
import { useApiCall } from '../../hooks/useApiCall';
import { useNotification } from '../../context/NotificationContext';

const StudentCourses = ({ student, onClose, onUpdate }) => {
  const [availableCourses, setAvailableCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, error, callApi } = useApiCall();
  const { showNotification } = useNotification();


  const fetchCourses = async () => {
    try {
      const response = await callApi(courseApi.getAll);
      setAvailableCourses(response.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      await callApi(studentApi.enrollCourse, student.studentId, courseId);
      showNotification('Successfully enrolled in course');
      onUpdate();
    } catch (err) {
      showNotification('Error enrolling in course', 'error');
    }
  };

  const handleDrop = async (courseId) => {
    try {
      await callApi(studentApi.dropCourse, student.studentId, courseId);
      showNotification('Successfully dropped course');
      onUpdate();
    } catch (err) {
      showNotification('Error dropping course', 'error');
    }
  };

  const isEnrolled = (courseId) => {
    return student.courses?.some(course => course.courseId === courseId);
  };

  const filteredCourses = availableCourses.filter(course =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <DialogTitle>
        Course Management: {student.firstName} {student.lastName}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Enrolled Courses
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {student.courses?.length > 0 ? (
              student.courses.map((course) => (
                <Chip
                  key={course.courseId}
                  label={course.courseName}
                  onDelete={() => handleDrop(course.courseId)}
                  color="primary"
                />
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No courses enrolled
              </Typography>
            )}
          </Box>
        </Box>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <List>
          {filteredCourses.map((course) => (
            <ListItem key={course.courseId}>
              <ListItemText
                primary={course.courseName}
                secondary={`Credits: ${course.credits} | Instructor: ${course.instructor.firstName} ${course.instructor.lastName}`}
              />
              <ListItemSecondaryAction>
                {isEnrolled(course.courseId) ? (
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => handleDrop(course.courseId)}
                  >
                    <Remove />
                  </IconButton>
                ) : (
                  <IconButton
                    edge="end"
                    color="primary"
                    onClick={() => handleEnroll(course.courseId)}
                  >
                    <Add />
                  </IconButton>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </>
  );
};

export default StudentCourses;