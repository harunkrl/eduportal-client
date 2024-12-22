import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || { 
      success: false, 
      message: 'Beklenmeyen bir hata oluştu', 
      data: null 
    });
  }
);

export const courseApi = {
  getAll: () => apiClient.get('/courses'),
  getById: (id) => apiClient.get(`/courses/${id}`),
  create: (data) => apiClient.post('/courses', data),
  update: (id, data) => apiClient.put(`/courses/${id}`, data),
  delete: (id) => apiClient.delete(`/courses/${id}`),
  getStudents: (id) => apiClient.get(`/courses/${id}/students`),
  assignInstructor: (courseId, instructorId) => 
    apiClient.post(`/courses/${courseId}/instructor/${instructorId}`)
};

export const instructorApi = {
  getAll: () => apiClient.get('/instructors'),
  getById: (id) => apiClient.get(`/instructors/${id}`),
  create: (data) => apiClient.post('/instructors', data),
  update: (id, data) => apiClient.put(`/instructors/${id}`, data),
  delete: (id) => apiClient.delete(`/instructors/${id}`),
  getCourses: (id) => apiClient.get(`/instructors/${id}/courses`)
};

export const studentApi = {
  getAll: () => apiClient.get('/students'),
  getById: (id) => apiClient.get(`/students/${id}`),
  create: (data) => apiClient.post('/students', data),
  update: (id, data) => apiClient.put(`/students/${id}`, data),
  delete: (id) => apiClient.delete(`/students/${id}`),
  getCourses: (id) => apiClient.get(`/students/${id}/courses`),
  enrollCourse: (studentId, courseId) => 
    apiClient.post(`/students/${studentId}/courses/${courseId}`),
  withdrawCourse: (studentId, courseId) => 
    apiClient.delete(`/students/${studentId}/courses/${courseId}`)
};

export default apiClient;