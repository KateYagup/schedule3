import React from 'react'
import PairByNumber from '../pairByNumber/PairByNumber';


const PairRow = ({
  scheduleOnDay,
  sortedCourseGroup,
}) => {
  // console.log('type', typeof scheduleOnDay);
  // console.log('scheduleOnDay', scheduleOnDay);
  const pairsArray = [];
  scheduleOnDay.forEach((element) => {
    // console.log('element', element);
    pairsArray.push(element.numbOfPair);
  });

  const lastPair = Math.max(...pairsArray);
  const arrOfPairs = [...Array(lastPair)].map((_, i) => i + 1);
  // console.log('arrOfPairs', arrOfPairs);
  return (
    <div>
      {arrOfPairs.map((pair) =>
        scheduleOnDay.some((item) => Number(item.numbOfPair) === pair) ? (
          <PairByNumber
            key={pair}
            pairs={scheduleOnDay.filter((item) => item.numbOfPair === pair)}
            sortedCourseGroup={sortedCourseGroup}
          />
        ) : (
          <div key={pair}>{pair}</div>
        ),
      )}
    </div>
  );
};

export default PairRow
