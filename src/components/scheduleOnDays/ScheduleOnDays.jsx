import React, { useState } from 'react';
import ScheduleOnCourses from '../scheduleOnCourses/ScheduleOnCourses';
import TeacherContainer from '../teacherContainer/TeacherContainer';
import Group from '../group/Group';
import PairRow from '../PairRow/PairRow';
import TeacherColumns from '../teacherColumns/TeacherColumns';

const ScheduleOnDays = ({
  scheduleOnDays,
  maxPairsForTeach,
  arrPairsByDay,
  sortedCourseGroup,
  maxColumnsByTeacher,
  mode,
  maxPairByDay,
  filtered,
  teachersSet,
  handleActive,
  handleSubmit,
  handlePosition,
  handleDelete,
  handleExchangeBlink,
  handlePairUp,
  handlePairDown,
  handlePairUnblink,
  handleSubmitForGroups,
  handleChangeField,
}) => {
  const [editingPairId, setEditingPairId] = useState(null);

  const daysOfWeek = [
    'Неділя',
    'Понеділок',
    'Вівторок',
    'Середа',
    'Четвер',
    "П/'ятниця",
    'Субота',
  ];

  return (
    <div>
      {Object.entries(scheduleOnDays).map(([day, scheduleOnDay]) => (
        <div key={day}>
          <div>{daysOfWeek[day]}</div>
          {mode === 'groups' && filtered === 'grUnited' && (
            <PairRow
              scheduleOnDay={scheduleOnDay}
              sortedCourseGroup={sortedCourseGroup}
            />
          )}
          {mode === 'groups' && filtered === 'grSepar' && (
            <Group
              scheduleOnDay={scheduleOnDay}
              day={day}
              // totalPairs={maxPairByDay[day]}
              totalPairs={maxPairByDay?.[day] ?? 0}
              sortedCourseGroup={sortedCourseGroup}
              handleActive={handleActive}
              handleSubmit={handleSubmit}
              handlePosition={handlePosition}
              handleDelete={handleDelete}
              handleExchangeBlink={handleExchangeBlink}
              handlePairUp={handlePairUp}
              handlePairDown={handlePairDown}
              handlePairUnblink={handlePairUnblink}
            />
          )}
          {mode === 'teachers' && (
            <div>
              <TeacherColumns
                scheduleOnDay={scheduleOnDay}
                maxPairsForTeach={maxPairsForTeach}
                arrPairsByDay={arrPairsByDay[day]}
                dayDefault={day}
                teachersSet={teachersSet}
                editingPairId={editingPairId}
                setEditingPairId={setEditingPairId}
                handleSubmitForGroups={handleSubmitForGroups}
                handleDelete={handleDelete}
                handlePosition={handlePosition}
                handleChangeField={handleChangeField}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ScheduleOnDays
