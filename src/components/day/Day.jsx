import React, { useState } from 'react';
import Pair from '../Pair/Pair';
import './day.scss';
import BlinkingPair from '../blinkingPair/BlinkingPair';

const Day = ({
  group,
  day,
  teacher,
  filtered,
  lessons,
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
  const numberOfPairs = [1, 2, 3, 4];
  const days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  return (
    <>
        {/* <div>{days[day]}</div> */}
      <div className="heightOfDay">
        {numberOfPairs.map((numb) => {
          const lessonsForSlot = lessons.filter(
            (item) => Number(item.numbOfPair) === numb,
          );

          if (lessonsForSlot.length === 0) {
            const week = 0;
            return (
              <div
                key={`empty-${numb}`} // добавь уникальный key
                className="emptyPair"
                onClick={() => {
                  filtered !== 'gr'
                    ? (() => {
                        handlePositionByTeacher(
                          teacher,
                          group,
                          day,
                          numb,
                          week,
                        );
                      })()
                    : handlePosition(group, day, numb, activeCourse, week);
                }}
              >
                {numb}{' '}
              </div>
            );
          }

          const regularLesson = lessonsForSlot.find(
            (item) => Boolean(item.week) === false,
          );

          if (regularLesson) {
            return (
              <Pair
                key={regularLesson.id}
                item={regularLesson}
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
            );
          }

          const weekLessons = lessonsForSlot.filter(
            (item) => item.week === 1 || item.week === 2,
          );

          return (
            <div key={`blink-${numb}`} className="blink-slot">
              <BlinkingPair
                weekLessons={weekLessons}
                group={group}
                day={day}
                teacher={teacher}
                numb={numb}
                filtered={filtered}
                activeCourse={activeCourse}
                handleActive={handleActive}
                handleChangeField={handleChangeField}
                handleSubmit={handleSubmit}
                handleDelete={handleDelete}
                handleSaveChanges={handleSaveChanges}
                filterOnTeacher={filterOnTeacher}
                handlePosition={handlePosition}
                handlePositionByTeacher={handlePositionByTeacher}
                handlePairUp={handlePairUp}
                handlePairDown={handlePairDown}
                handlePairUnblink={handlePairUnblink}
                handleExchangeBlink={handleExchangeBlink}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Day;
