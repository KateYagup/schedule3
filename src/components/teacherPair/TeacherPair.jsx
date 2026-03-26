import React from 'react';
import TeacherPairForm from '../teacherPairForm/teacherPairForm';
import GroupsSlot from '../groupsSlot/GroupsSlot';
import '../../styles/teachers.scss';
import '../../styles/pairs.scss';

const TeacherPair = ({
  arrPair = [],
  editingPairId,
  setEditingPairId,
  dayDefault,
  teacherDefault,
  pairDafault,
  subPair,
  handleSubmitForGroups,
  handleDelete,
  handlePosition,
  handleChangeField,
}) => {
  if (!arrPair.length) {
    return (
      <div
        className="pairCell"
        onClick={() =>
          console.log(`${dayDefault} ${teacherDefault} ${pairDafault}`)
        }
      ></div>
    );
  }

  const { day, numbOfPair, teacher } = arrPair[0];

  const getPairId = (week) =>
    `${day}_${numbOfPair}_${subPair}_${teacher}_${week}`;

  const week1 = arrPair.find((p) => Number(p.week) === 1);
  const week2 = arrPair.find((p) => Number(p.week) === 2);
  const week0 = arrPair.find((p) => Number(p.week) === 0);

  const isEditingWeek1 = editingPairId === getPairId(1);
  const isEditingWeek2 = editingPairId === getPairId(2);
  const isEditingWeek0 = editingPairId === getPairId(0);

  // обычная пара (не мигалка)
  if (week0) {
    return (
      <div
        className={`pairCell pair__${week0.type}`}
        onClick={
          () => setEditingPairId(getPairId(0))
          // setEditingPairId((prev) =>
          //   prev === getPairId(0) ? null : getPairId(0),
          // )
        }
      >
        {isEditingWeek0 ? (
          <div className="pairCell--edit">
            <TeacherPairForm
              pair={week0}
              handleSubmitForGroups={handleSubmitForGroups}
              setEditingPairId={setEditingPairId}
              handleDelete={handleDelete}
              handlePosition={handlePosition}
              handleChangeField={handleChangeField}
            />
          </div>
        ) : (
          <>
            {week0.subj}
            <GroupsSlot groups={week0.groups} />
          </>
        )}
      </div>
    );
  }

  // мигалка
  return (
    <div className="pairCell">
      <div
        className={`pairCell__firstWeek  pair__${week1?.type}`}
        onClick={(e) => {
          e.stopPropagation();
          setEditingPairId(getPairId(1));
          // setEditingPairId((prev) =>
          //   prev === getPairId(1) ? null : getPairId(1),
          // );
        }}
      >
        {isEditingWeek1 ? (
          <TeacherPairForm
            pair={week1}
            handleSubmitForGroups={handleSubmitForGroups}
            setEditingPairId={setEditingPairId}
            handleDelete={handleDelete}
            handlePosition={handlePosition}
            handleChangeField={handleChangeField}
          />
        ) : (
          <>
            {week1?.subj}
            {week1 && <GroupsSlot groups={week1.groups} />}
          </>
        )}
      </div>

      <div
        className={`pairCell__secondWeek  pair__${week2?.type}`}
        onClick={(e) => {
          e.stopPropagation();
          setEditingPairId(getPairId(2));
          // setEditingPairId((prev) =>
          //   prev === getPairId(2) ? null : getPairId(2),
          // );
        }}
      >
        {isEditingWeek2 ? (
          <TeacherPairForm
            pair={week2}
            handleSubmitForGroups={handleSubmitForGroups}
            setEditingPairId={setEditingPairId}
            handleDelete={handleDelete}
            handlePosition={handlePosition}
            handleChangeField={handleChangeField}
          />
        ) : (
          <>
            {week2?.subj}
            {week2 && <GroupsSlot groups={week2.groups} />}
          </>
        )}
      </div>
    </div>
  );
};

export default TeacherPair;
