import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Schedule from './components/schedule/Schedule.jsx';
// import TeacherPage from './components/TeacherPage/TeacherPage.jsx';
import './App.css';


function App() {
// Настройка маршрута
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Schedule />} />
        <Route
          path="/showGroupsUnited"
          element={<Schedule showGroupsUnited={true} />}
        />
        {/* Страница, где показываем всех преподавателей */}
        <Route path="/teachers" element={<Schedule showTeachers={true} />} />
        <Route path="/teachersCompact" element={<Schedule Compact={true} />} />
        <Route path="/teachersCol" element={<Schedule Compact={true} />} />
        <Route
          path="/teachers/:teacherName"
          element={<Schedule showTeachers={true} />}
        />
      </Routes>
    </Router>
  );
     }

export default App
