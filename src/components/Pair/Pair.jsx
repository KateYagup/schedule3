import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PairForm from '../PairForm/PairForm.jsx';
import './index.scss';
import '../../styles/pairs.scss';

const Pair = ({
  item,
  group,
  filtered,
  handleActive,
  handleChangeField,
  handleSubmit,
  handleDelete,
  activeCourse,
  handleSaveChanges,
  filterOnTeacher,
  handlePairUp,
  handlePairDown,
  handlePairUnblink,
  handleExchangeBlink,
}) => {
  const { subj, course, numbOfPair, teacher, isActive, id, type } = item;
  return (
    <>
      <div>
        {isActive ? (
          <PairForm
            id={id}
            subj={subj}
            teacher={teacher}
            group={group}
            item={item}
            filtered={filtered}
            activeCourse={activeCourse}
            handleChangeField={handleChangeField}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            handlePairUp={handlePairUp}
            handlePairDown={handlePairDown}
            handlePairUnblink={handlePairUnblink}
            handleExchangeBlink={handleExchangeBlink}
          />
        ) : (
          <div>
            <div
              className={`pair pair__${type}`}
              onClick={() => handleActive(id)}
            >
              {` ${numbOfPair} ${subj} ${teacher}  курс ${course} ${type}`}
            </div>
            {/* <Link className="teacherLink" to={`/users/${teacher}`}>
              {teacher}
            </Link> */}
          </div>
        )}
      </div>
    </>
  );
};

export default Pair;
