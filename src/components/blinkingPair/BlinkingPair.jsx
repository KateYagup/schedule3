import React, { useState } from 'react';
import Pair from '../Pair/Pair';
import './blinkingPair.scss';

const BlinkingPair = ({
  weekLessons,
  group,
  day,
  teacher,
  numb,
  filtered,
  handleActive,
  handleChangeField,
  handleSubmit,
  handleDelete,
  activeCourse,
  handleSaveChanges,
  filterOnTeacher,
  handlePosition,
  handlePositionByTeacher,
  handlePairUp,
  handlePairDown,
  handlePairUnblink,
  handleExchangeBlink,
}) => {
  const weeks = [1, 2];

  return (
    <div className="blink-slot">
      {weeks.map((weekNum) => {
        const lessonForWeek = weekLessons.find((item) => item.week === weekNum);

        return (
          <div
            key={`week-${weekNum}`}
            className={weekNum === 1 ? 'weekBottom' : 'week-block'}
          >
            {lessonForWeek ? (
              <Pair
                item={lessonForWeek}
                group={group}
                filtered={filtered}
                activeCourse={activeCourse}
                handleActive={handleActive}
                handleChangeField={handleChangeField}
                handleSubmit={handleSubmit}
                handleDelete={handleDelete}
                handleSaveChanges={handleSaveChanges}
                filterOnTeacher={filterOnTeacher}
                handlePairUp={handlePairUp}
                handlePairDown={handlePairDown}
                handlePairUnblink={handlePairUnblink}
                handleExchangeBlink={handleExchangeBlink}
              />
            ) : (
              <div
                className="emptyPair blink"
                onClick={() => {
                  console.log('CLICK EMPTY', {
                    group,
                    teacher,
                    weekNum,
                    day,
                    numb,
                  });
                  filtered !== 'grUnited'
                    ? (() => {
                        handlePositionByTeacher(
                          teacher,
                          group,
                          day,
                          numb,
                          weekNum
                        );
                      })()
                    : handlePosition(group, day, numb, activeCourse, weekNum);
                }}
                // onClick={() => {console.log('Создать урок для недели', weekNum)}}
              >
                {`Н/д ${weekNum}`}
              </div>
            )}

            {/* {weekNum === 1 && (
              <div className="week-divider">--------------------------</div>
            )} */}
          </div>
        );
      })}
    </div>
  );
};

export default BlinkingPair;
