import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import Layout from './components/layout/Layout';
import Home from './components/home/Home';
import InstructorList from './components/instructor/InstructorList';
import InstructorForm from './components/instructor/InstructorForm';
import InstructorDetail from './components/instructor/InstructorDetail';
import CourseList from './components/course/CourseList';
import CourseForm from './components/course/CourseForm';
import CourseDetails from './components/course/CourseDetails';
import StudentList from './components/student/StudentList';
import StudentForm from './components/student/StudentForm';
import StudentDetails from './components/student/StudentDetails';
import RouteErrorBoundary from './components/error/RouteErrorBoundary';
import './App.css';

const App = () => {
  return (
    <NotificationProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} errorElement={<RouteErrorBoundary />} />
            
            {/* Instructor Routes */}
            <Route path="/instructors" element={<InstructorList />} />
            <Route path="/instructors/create" element={<InstructorForm />} />
            <Route path="/instructors/edit/:id" element={<InstructorForm />} />
            <Route path="/instructors/:id" element={<InstructorDetail />} />
            
            {/* Course Routes */}
            <Route path="/courses" element={<CourseList />} />
            <Route path="/courses/create" element={<CourseForm />} />
            <Route path="/courses/edit/:id" element={<CourseForm />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            
            {/* Student Routes */}
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/create" element={<StudentForm />} />
            <Route path="/students/edit/:id" element={<StudentForm />} />
            <Route path="/students/:id" element={<StudentDetails />} />
            
            {/* 404 Route */}
            <Route path="*" element={<RouteErrorBoundary />} />
          </Routes>
        </Layout>
      </Router>
    </NotificationProvider>
  );
};

export default App;