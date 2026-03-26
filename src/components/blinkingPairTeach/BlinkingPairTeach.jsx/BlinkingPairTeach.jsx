import React from 'react';
import '../../../styles/teachers.scss';



const BlinkingPairTeach = ({ pair }) => {
   const { subj, type, groups, teacher, week } = pair;
   const weeks = [1, 2];

  return (
    <div className="teacherPair">
      {weeks.map((weekNumb) => (
        <div className={weekNumb === 1 ? 'separatePair' : 'blinkPair'}>
          {weekNumb === week && (
            <div className="subjWithGroups">
              <div>{`${subj}`}</div>
              <div className="groupsSlot">
                {groups.map((group) => (
                  <div key={group} className="groupStyle">
                    {group}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BlinkingPairTeach
