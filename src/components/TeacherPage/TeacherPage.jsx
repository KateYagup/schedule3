
import React, {useMemo} from 'react';
import { useParams } from 'react-router-dom';
import Group from '../group/Group';
import TeachOnGroups from '../teachOnGroups/TeachOnGroups';
import './TeacherPage.scss';

const isSamePair = (a, b) =>
  a.day === b.day && a.numbOfPair === b.numbOfPair && a.subj === b.subj;

const diffrentSubj = (a, b)  =>
  a.day === b.day && a.numbOfPair === b.numbOfPair && a.subj !== b.subj;

const TeacherPage = ({
  teacher,
  lessons,
  course,
  filtered,
  groupSchedule,
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
  // console.log(teacher)
  // console.log(lessons)
// вот тут нужно сформировать новую структуру из полученного lesson
// тут уже выводится для отдельного препода


const schedule = useMemo(() => {
  if (!lessons?.length) return [];

  const columns = [];

  lessons.forEach((lesson) => {
    const { day, numbOfPair, subj, type, group } = lesson;

    // 1️⃣ Ищем колонку, где НЕТ конфликта:
    // конфликт = та же пара (day + numbOfPair) но ДРУГОЙ предмет или тип
    let column = columns.find(
      (col) =>
        !col.some(
          (p) =>
            p.day === day &&
            p.numbOfPair === numbOfPair &&
            (p.subj !== subj || p.type !== type),
        ),
    );

    // 2️⃣ Если не нашли — создаём новую колонку
    if (!column) {
      column = [];
      columns.push(column);
    }

    // 3️⃣ Ищем саму пару
    let pair = column.find(
      (p) =>
        p.day === day &&
        p.numbOfPair === numbOfPair &&
        p.subj === subj &&
        p.type === type,
    );

    // 4️⃣ Если пары нет — создаём
    if (!pair) {
      pair = {
        day,
        numbOfPair,
        subj,
        type,
        groups: [],
      };
      column.push(pair);
    }

    // 5️⃣ Добавляем группу
    if (!pair.groups.includes(group)) {
      pair.groups.push(group);
    }
  });
// console.log(teacher);
// console.log('scheduleCompact');
// console.log(typeof columns)
  return columns;
}, [lessons]);

const scheduleOnDays = useMemo(() => {
  const result = {};

  scheduleCompact.forEach((column, colIndex) => {
    column.forEach((pair) => {
      if (!result[pair.day]) result[pair.day] = [];

      result[pair.day][colIndex] = pair;
    });
  });

  return result;
}, [scheduleCompact]);



  const groups = [...new Set(lessons.map((item) => item.group))];
  const groupsOfTeacher = groups.map((group) => ({
    group,
    groupSched: lessons.filter((item) => item.group === group),
  }));
  return (
    <div>
      {/* {Object.entries(scheduleOnDays).map(([day, columns]) => (
        <div key={day} className="day-block">
          <div className="day-title">День {day}</div>

          <div className="day-row">
            {Array.from({ length: scheduleCompact.length }).map(
              (_, colIndex) => {
                const pair = columns[colIndex];

                return (
                  <div key={colIndex} className="day-cell">
                    {pair ? (
                      <>
                        <div>{pair.subj}</div>
                        <div>{pair.groups.join(', ')}</div>
                      </>
                    ) : null}
                  </div>
                );
              },
            )}
          </div>
        </div>
      ))} */}

      {/* {scheduleOnDays.map(item =>(
        <div>{item.day}</div>
      ))} */}
      <div>{teacher}</div>
      <div className="teachersGroups">
        {groupsOfTeacher.map((value) => (
          <TeachOnGroups
            key={value.group}
            teacher={teacher}
            group={value.group}
            course={value.course}
            filtered={filtered}
            groupSchedule={value.groupSched}
            handleActive={handleActive}
            handleChangeField={handleChangeField}
            handleSubmit={handleSubmit}
            handlePosition={handlePosition}
            handlePositionByTeacher={handlePositionByTeacher}
            handleDelete={handleDelete}
            handleSaveChanges={handleSaveChanges}
            filterOnTeacher={filterOnTeacher}
            handlePairUp={handlePairUp}
            handlePairDown={handlePairDown}
            handlePairUnblink={handlePairUnblink}
            handleExchangeBlink={handleExchangeBlink}
          />
        ))}
      </div>
    </div>
  );
};

export default TeacherPage;