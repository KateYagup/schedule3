import React from 'react';
import TeacherPair from '../teacherPair/TeacherPair';
import '../../styles/teachers.scss';

const TeacherColumn = ({
  totalPairs,
  column = [],
  editingPairId,
  setEditingPairId,
  dayDefault,
  teacherDafault,
  handlePosition,
}) => {
  // console.log('totalPairs', totalPairs);
  // console.log('column', column);
  const pairsForDay = Array.from({ length: totalPairs });
  // console.log('pairsForDay', pairsForDay);

  return (
    <div>
      {pairsForDay.map((_, index) => {
        const pairNumber = index + 1;
        const pair = column.find(
          (item) => Number(item.numbOfPair) === Number(pairNumber),
        );
        const arrPair = column.filter(
          (item) => Number(item.numbOfPair) === Number(pairNumber),
        );
        const arrPairLimited = [
          arrPair.find((el) => el.week === 1),
          arrPair.find((el) => el.week === 2),
        ].filter(Boolean);

        return (
          <TeacherPair
            key={`${pairNumber}-${column[0]?.teacher}-${column[0]?.day || '0'}`}
            pair={pair}
            arrPair={arrPair}
            editingPairId={editingPairId}
            setEditingPairId={setEditingPairId}
            dayDefault={dayDefault}
            teacherDafault={teacherDafault}
            pairDafault={pairNumber}
            handlePosition={handlePosition}
          />
        );
      })}
    </div>
  );
};

export default TeacherColumn;
