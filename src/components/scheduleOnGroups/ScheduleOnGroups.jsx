import React from 'react';
import './scheduleOnGroups.scss';
import ScheduleOnPairs from '../scheduleOnPairs/ScheduleOnPairs';

const ScheduleOnGroups = ({ sched }) => {
  return (
    <div className="coursesGrid">
      {/* ScheduleOnGroups */}
      {sched.map((groupsItem) => (
        <div>
          <div className="groupSlot">{groupsItem.name}</div>
          <ScheduleOnPairs sched={groupsItem.lessons} />
        </div>
      ))}
    </div>
  );
};

export default ScheduleOnGroups
