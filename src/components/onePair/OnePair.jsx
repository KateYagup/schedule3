import React from 'react';
import OnePairTeacher from '../onePairTeacher/OnePairTeacher';
import TeacherPair from '../teacherPair/TeacherPair';
import '../../styles/pairs.scss';

// <== PairOnDayTeachers
const OnePair = ({
  pair,
  numb,
  numbSubPairs,
  dayDefault,
  teacherDefault,
  pairDafault,
  editingPairId,
  setEditingPairId,
  handleSubmitForGroups,
  handleDelete,
  handlePosition,
  handleChangeField,
}) => {
  // console.log('OnePair');
  // console.log(pair);
  // console.log('numbSubPairs', numbSubPairs);
  const subPairs = Array.from({ length: numbSubPairs }, (_, i) => i + 1);
  return (
    <div>
      <div> {numb} </div>
      {subPairs.map((_, i) => {
        return (
          <TeacherPair
            key={`${numb}-${i}`}
            subPair={i}
            arrPair={pair[i]}
            editingPairId={editingPairId}
            setEditingPairId={setEditingPairId}
            dayDefault={dayDefault}
            teacherDefault={teacherDefault}
            pairDafault={pairDafault}
            handleSubmitForGroups={handleSubmitForGroups}
            handleDelete={handleDelete}
            handlePosition={handlePosition}
            handleChangeField={handleChangeField}
          />
        );
      })}
    </div>
  );
};

export default OnePair;
