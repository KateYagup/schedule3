import React from 'react';
import './coursesPanel.scss';

const CoursesPanel = ({ activeCourse, handleActiveCourse }) => {
  const courses = [1, 2, 3, 4, 5];

  return (
    <div className="coursesPanel">
      Курсы
      {courses.map((id) => (
        <div
          key={id}
          onClick={() => handleActiveCourse(id)}
          className={activeCourse === id ? 'activeCourse' : 'course'}
        >
          {id}
        </div>
      ))}
      <div
        key={0}
        onClick={() => handleActiveCourse(0)}
        className={activeCourse === 0 ? 'activeCourse' : 'course'}
      >
        Усі курси
      </div>
    </div>
  );
};

export default CoursesPanel;
