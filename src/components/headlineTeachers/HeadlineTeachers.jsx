import React from 'react';
// import './headlineTeachers.scss';
import '../../styles/teachers.scss';
import '../../styles/pairs.scss';


const HeadlineTeachers = ({ maxColumnsByTeacher }) => {
  return (
    <div>
      <div className="teacher-header">
        {Object.entries(maxColumnsByTeacher)
          .sort(([a], [b]) => a.localeCompare(b, 'uk'))
          .map(([name, col]) => (
            <div key={name} className="teacherUnitedRows">
              <div className="teacherName">{name}</div>
              {Array.from({ length: Number(col) }).map((_, i) => (
                <div key={i} className="headUnitedCellsTeachers">
                  {/* {name} */}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default HeadlineTeachers;
