import React from 'react';
import OnePair from '../onePair/OnePair';

// scheduleOnDay - TeacherColumns -PairOnDayTeacher - OnePair
// <== TeacherColumns
const PairOnDayTeachers = ({
  lesson = [],
  arrPairsByDay,
  dayDefault,
  teacherDefault,
  editingPairId,
  setEditingPairId,
  handleSubmitForGroups,
  handleDelete,
  handlePosition,
  handleChangeField,
}) => {
  // console.log('handlePosition', handlePosition);
  // console.log('lesson', lesson);
  // console.log('Номер пары', lesson?.[0]?.[0]?.teacher);
  // const flatLessons = lesson.flat();
  // console.log('flatLessons', flatLessons)

  const maxPairNumb = Math.max(...Object.keys(arrPairsByDay).map(Number));

  const pairPerDay = Array.from({ length: maxPairNumb }, (_, i) => i + 1);

  return (
    <div>
      <div>
        {pairPerDay.map((pairNumb) => (
          <OnePair
            key={pairNumb}
            pair={lesson.filter((sub) => sub?.[0]?.numbOfPair === pairNumb)}
            numb={pairNumb}
            numbSubPairs={arrPairsByDay[pairNumb]}
            editingPairId={editingPairId}
            setEditingPairId={setEditingPairId}
            dayDefault={dayDefault}
            teacherDefault={teacherDefault}
            pairDafault={pairNumb}
            handleSubmitForGroups={handleSubmitForGroups}
            handleDelete={handleDelete}
            handlePosition={handlePosition}
            handleChangeField={handleChangeField}
          />
        ))}
      </div>
    </div>
  );
};

// const PairOnDayTeachers = ({ lesson = [], arrPairsByDay, day }) => {
//   // console.log('lesson', lesson);

//   const maxPairNumb = Math.max(...Object.keys(arrPairsByDay).map(Number));

//   const pairPerDay = Array.from({ length: maxPairNumb }, (_, i) => i + 1);

//   return (
//     <div>
//       <div>
//         {pairPerDay.map((pairNumb) => (
//           <OnePair
//             key={pairNumb}
//             pair={lesson.filter((el) => el.numbOfPair === pairNumb)}
//             numb={pairNumb}
//             numbSubPairs={arrPairsByDay[pairNumb]}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

export default PairOnDayTeachers;
