import React from 'react';
import PairOnDayTeachers from '../pairOnDayTeachers/PairOnDayTeachers';

// <== ScheduleOnDays
const TeacherColumns = ({
  scheduleOnDay,
  maxPairsForTeach,
  arrPairsByDay,
  dayDefault,
  teachersSet,
  editingPairId,
  setEditingPairId,
  handleSubmitForGroups,
  handleDelete,
  handlePosition,
  handleChangeField,
}) => {
  // console.log(day);
  // console.log('scheduleOnDay!!!', scheduleOnDay);
  // console.log('arrPairsByDay', arrPairsByDay);
  // const pairs = arrPairsByDay[day];
  // console.log(pairs);
  // scheduleOnDay.map(lesson => {
  //   console.log('lesson', lesson);
  //   console.log('lesson-s', lesson.lessons);
  // })
  // console.log('teachersSet', teachersSet);
  // console.log('day', day)
  // console.log('Отсортировали')
  // console.log(teachersSet.map(teacher => scheduleOnDay.filter(el => teacher === el.teacher)))

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {[...teachersSet].map((teacher) => {
        const teacherLessons = scheduleOnDay.filter(
          (el) => teacher === el.teacher,
        );
        // console.log('teacherLessons!!!', teacherLessons);
        return (
          <PairOnDayTeachers
            key={teacher}
            lesson={teacherLessons.flatMap((el) => el.lessons)}
            arrPairsByDay={arrPairsByDay}
            dayDefault={dayDefault}
            teacherDefault={teacher}
            editingPairId={editingPairId}
            setEditingPairId={setEditingPairId}
            handleSubmitForGroups={handleSubmitForGroups}
            handleDelete={handleDelete}
            handlePosition={handlePosition}
            handleChangeField={handleChangeField}
          />
        );
      })}
    </div>

    // <div style={{ display: 'flex', flexDirection: 'rows' }}>
    //   {scheduleOnDay.map((lesson, index) => (
    //     <PairOnDayTeachers
    //       key={index}
    //       lesson={lesson}
    //       arrPairsByDay={arrPairsByDay}
    //       day={day}
    //     />
    //   ))}
    // </div>
  );
};

export default TeacherColumns;
