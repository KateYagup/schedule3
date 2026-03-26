import React from 'react';
import TeacherCmpactPairs from '../teacherCmpactPairs/teacherCmpactPairs';
import TeacherColumn from '../teacherColumn/TeacherColumn';
import './teacherContainer.scss';

const TeacherContainer = ({
  scheduleOnDay,
  maxColumnsByTeacher,
  totalPairs,
  editingPairId,
  setEditingPairId,
  dayDefault,
}) => {
  // 1️⃣ группируем колонки текущего дня по преподавателю
  const columnsByTeacher = {};

  // console.log('scheduleOnDay', scheduleOnDay);

  scheduleOnDay.forEach((column) => {
    const teacher = column[0]?.teacher;
    if (!teacher) return;

    if (!columnsByTeacher[teacher]) {
      columnsByTeacher[teacher] = [];
    }

    columnsByTeacher[teacher].push(column);
  });

  return (
    <div className="teachersDay">
      {Object.entries(maxColumnsByTeacher)
        .sort(([a], [b]) => a.localeCompare(b, 'uk'))
        .map(([teacher, maxCols]) => {
          const teacherColumns = columnsByTeacher[teacher] || [];

          return (
            <div key={teacher} className="teacherContainer">
              {Array.from({ length: maxCols }).map((_, colIndex) => {
                const column = teacherColumns[colIndex] || [];

                return (
                  <>
                    <TeacherColumn
                      key={colIndex} // ⚠ обязательно уникальный ключ
                      totalPairs={totalPairs}
                      column={column}
                      editingPairId={editingPairId}
                      setEditingPairId={setEditingPairId}
                      dayDefault={dayDefault}
                      teacherDafault={teacher}
                    />
                  </>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default TeacherContainer;
