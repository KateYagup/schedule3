import React, { useState, useEffect } from 'react';
import Day from '../day/Day'
import GrPair from '../grPair/GrPair';
// import './group.scss';
import '../../styles/pairsByGroups.scss';
import '../../styles/pairs.scss';



const Group = ({
  scheduleOnDay,
  day,
  totalPairs,
  sortedCourseGroup,
  handleActive,
  handleSubmit,
  handlePosition,
  handleDelete,
  handleExchangeBlink,
  handlePairUp,
  handlePairDown,
  handlePairUnblink,
}) => {
  const pairArr = Array.from({ length: totalPairs }, (_, i) => i + 1);

  return (
    <div className="groupArrangement">
      {pairArr.map((numbPair) => (
        <div key={numbPair} className="pairRow">
          {sortedCourseGroup.map(({ course, group }) => {
            const lesson = scheduleOnDay.filter(
              (item) =>
                item.group === group &&
                Number(item.numbOfPair) === Number(numbPair) &&
                Number(item.course) === Number(course),
            );
            // console.log('lesson', lesson);
            return (
              <div
                key={`${course}-${group}-${numbPair}`}
                className="pairCell"
                onClick={() => {
                  if (lesson.length === 0) {
                    handlePosition(group, day, numbPair, course, 0);
                  }
                }}
              >
                {lesson.length > 0 ? (
                  <GrPair
                    lesson={lesson}
                    handleActive={handleActive}
                    handleSubmit={handleSubmit}
                    handleDelete={handleDelete}
                    handlePosition={handlePosition}
                    groupDefault={group}
                    dayDefault={day}
                    numbPairDefault={numbPair}
                    courseDefault={course}
                    handleExchangeBlink={handleExchangeBlink}
                    handlePairUp={handlePairUp}
                    handlePairDown={handlePairDown}
                    handlePairUnblink={handlePairUnblink}
                  />
                ) : (
                  <span className="empty-cell"></span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Group;
