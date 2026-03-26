import React, { useState, useEffect } from 'react';
import Day from '../day/Day';
import './group.scss';

const GroupForTeacher = ({
  teacher,
  groupSchedule,
  handleActive,
  handleChangeField,
  handleSubmit,
  handlePosition,
  handleDelete,
  handleSaveChanges,
  filterOnTeacher,
}) => {
  const days = [0, 1, 2, 3, 4, 5];
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
  }, []);

  useEffect(() => {
    // console.log('day');
    // console.log(day);
    // day.map((item) => console.log(item.subj));
  }, [day]);

  return (
    <div className="groupArrangement">
      {days.map((day) => {
        if (Array.isArray(groupSchedule)) {
          const lessonsForDay = groupSchedule.filter((item) => item.day == day);
          return (
            <Day
              key={`${group}-${day}`}
              handlePosition={handlePosition}
              group={group}
              day={day}
              lessons={lessonsForDay}
              handleActive={handleActive}
              handleChangeField={handleChangeField}
              handleSubmit={handleSubmit}
              handleDelete={handleDelete}
              handleSaveChanges={handleSaveChanges}
              filterOnTeacher={filterOnTeacher}
            />
          );
        }
      })}
    </div>
  );
};

export default GroupForTeacher;
