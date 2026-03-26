import React from 'react';
import './pairByNumber.scss';

const isSamePair = (a, b) =>
  a &&
  b &&
  a.subj === b.subj &&
  a.numbOfPair === b.numbOfPair &&
  a.week === b.week &&
  a.teacher === b.teacher &&
  a.subj === b.subj &&
  a.type === b.type;

  const PairByNumber = ({ pairs, sortedCourseGroup }) => {
    const result = [];

    let prevPair = null;
    let prevColumn = null;

    sortedCourseGroup.forEach((column) => {
      const currentPair =
        pairs.find(
          (p) =>
            p.group === column.group &&
            Number(p.course) === Number(column.course),
        ) || null;

      if (prevPair && currentPair && isSamePair(prevPair, currentPair)) {
        const last = result[result.length - 1];

        if (last.groups) {
          last.groups.push(column);
        } else if (last) {
          result[result.length - 1] = {
            ...last,
            groups: [prevColumn, column],
            group: undefined,
            course: undefined,
          };
        }
      } else {
        if (currentPair) {
          result.push({
            ...currentPair,
            column,
          });
        }
      }

      prevPair = currentPair;
      prevColumn = column;
    });

    let col = 0;

    return (
      <div
        className="pair-line"
        style={{ '--groups-count': sortedCourseGroup.length }}
      >
        {result.map((pair, i) => {
          const startColumn = pair.groups ? pair.groups[0] : pair.column;

          const span = pair.groups ? pair.groups.length : 1;

          const startIndex = sortedCourseGroup.findIndex(
            (c) =>
              c.group === startColumn.group && c.course === startColumn.course,
          );

          const emptyBefore = startIndex - col;
          col = startIndex + span;

          return (
            <React.Fragment key={i}>
              {Array.from({ length: emptyBefore }).map((_, i) => (
                <div key={`empty-${i}`} className="pair-cell empty" />
              ))}

              <div className="pair-cell" style={{ gridColumn: `span ${span}` }}>
                <div>{pair.subj}</div>
                <div>{pair.teacher}</div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  };

export default PairByNumber;
