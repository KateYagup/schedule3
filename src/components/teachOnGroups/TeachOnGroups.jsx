import React, { useState, useEffect } from 'react';
import Day from '../day/Day';
import './group.scss';

const TeachOnGroups = ({
  group,
  teacher,
  groupSchedule,
  filtered,
  activeCourse,
  handleActive,
  handleChangeField,
  handleSubmit,
  handlePosition,
  handlePositionByTeacher,
  handleDelete,
  handleSaveChanges,
  filterOnTeacher,
  handlePairUp,
  handlePairDown,
  handlePairUnblink,
  handleExchangeBlink,
}) => {
  const days = [0, 1, 2, 3, 4, 5];
  const namesOfDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  const [day, setDay] = useState({});

  useEffect(() => {
    if (Array.isArray(groupSchedule)) {
      const daySchedule = groupSchedule.reduce((acc, item) => {
        if (!acc[item.day]) {
          acc[item.day] = [];
        }
        acc[item.day].push(item);
        return acc;
      }, {});
      setDay(daySchedule);
    }
  }, [groupSchedule]);

  return (
    <div className="groupArrangement">
      <div>{group}</div>
      {days.map((day) => {
        if (Array.isArray(groupSchedule)) {
          const lessonsForDay = groupSchedule.filter((item) => item.day == day);
          return (
            <>
              <div>{namesOfDays[day]}</div>
              <Day
                key={`${group}-${day}`}
                // key={group + '-' + teacher}
                filtered={filtered}
                group={group}
                day={day}
                teacher={teacher}
                lessons={lessonsForDay}
                activeCourse={activeCourse}
                handleActive={handleActive}
                handleChangeField={handleChangeField}
                handlePosition={handlePosition}
                handlePositionByTeacher={handlePositionByTeacher}
                handleSubmit={handleSubmit}
                handleDelete={handleDelete}
                handleSaveChanges={handleSaveChanges}
                filterOnTeacher={filterOnTeacher}
                handlePairUp={handlePairUp}
                handlePairDown={handlePairDown}
                handlePairUnblink={handlePairUnblink}
                handleExchangeBlink={handleExchangeBlink}
              />
            </>
          );
        }
      })}
    </div>
  );
};

export default TeachOnGroups;
