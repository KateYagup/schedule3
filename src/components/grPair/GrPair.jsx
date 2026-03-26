import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PairForm from '../PairForm/PairForm.jsx';
// import './index.scss';
import '../../styles/pairs.scss';
import '../../styles/teachers.scss';

const GrPair = ({
  lesson,
  handleActive,
  handleSubmit,
  handleDelete,
  handlePosition,
  groupDefault,
  dayDefault,
  numbPairDefault,
  courseDefault,
  handleExchangeBlink,
  handlePairUp,
  handlePairDown,
  handlePairUnblink,
}) => {
  // console.log('', lesson);
  // const {type} = lesson;
  const week = lesson.find((item) => Number(item.week) === 0);
  const week1 = lesson.find((item) => Number(item.week) === 1);
  const week2 = lesson.find((item) => Number(item.week) === 2);

  if (week) {
    return week.isActive ? (
      <PairForm
        data={week}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        handlePairUp={handlePairUp}
        handlePairDown={handlePairDown}
      />
    ) : (
      <div
        className={`pairCell pair__${week.type}`}
        onClick={() => handleActive(week.id)}
      >
        {`${week.subj} ${week.teacher} ${week.type}`}
      </div>
    );
  }

  if (week1 && week2) {
    return (
      <div>
        {week1.isActive ? (
          <PairForm
            data={week1}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            handleExchangeBlink={handleExchangeBlink}
            // handlePairUnblink={handlePairUnblink}
          />
        ) : (
          <div
            className={`pairCell__firstWeek pair__${week1.type}`}
            onClick={() => {
              handleActive(week1.id);
            }}
          >
            {`${week1.subj}  ${week1.teacher}`}
          </div>
        )}
        {week2.isActive ? (
          <PairForm
            data={week2}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            // handlePairUnblink={handlePairUnblink}
          />
        ) : (
          <div
            className={`pairCell__secondWeek pair__${week2.type}`}
            onClick={() => {
              handleActive(week2.id);
            }}
          >
            {`${week2.subj}  ${week2.teacher}`}
          </div>
        )}
      </div>
    );
  }

  if (week1 && !week2) {
    return (
      <div className="pairCell">
        <div className="pairCell__firstWeek">
          {week1.isActive ? (
            <PairForm
              data={week1}
              handleSubmit={handleSubmit}
              handleDelete={handleDelete}
              handlePairUnblink={handlePairUnblink}
            />
          ) : (
            <div
              className={`pairCell__firstWeek pair__${week1.type}`}
              // className="pairCell__content"
              onClick={() => {
                handleActive(week1.id);
              }}
            >
              {`${week1.subj}  ${week1.teacher}`}
            </div>
          )}
        </div>
        <div
          className="pairCell__secondWeek"
          onClick={() => {
            handlePosition(
              groupDefault,
              dayDefault,
              numbPairDefault,
              courseDefault,
              Number(2),
            );
          }}
        ></div>
      </div>
    );
  }

  if (!week1 && week2) {
    return (
      <div>
        <div
          className="pairCell__firstWeek"
          onClick={() => {
            handlePosition(
              groupDefault,
              dayDefault,
              numbPairDefault,
              courseDefault,
              Number(1),
            );
          }}
        ></div>
        <div className="pairCell__secondWeek">
          {week2.isActive ? (
            <div className="secondWeekPair">
              {' '}
              <PairForm
                data={week2}
                handleSubmit={handleSubmit}
                handleDelete={handleDelete}
                handlePairUnblink={handlePairUnblink}
              />
            </div>
          ) : (
            <div
              className={`pairCell__secondWeek pair__${week2.type}`}
              onClick={() => {
                handleActive(week2.id);
              }}
            >
              {`${week2.subj}  ${week2.teacher}`}
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default GrPair;
