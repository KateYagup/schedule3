import React from 'react';
import ScheduleOnDays from '../scheduleOnDays/ScheduleOnDays';
import ScheduleOnGroups from '../scheduleOnGroups/ScheduleOnGroups';
import './scheduleOnCourses.scss';

const scheduleOnCourses = ({ sched }) => {
  // console.log('Из расписания по группам', sched);
  // console.log(Object.entries(sched));

  return (
    <div className='coursesGrid'>
      {/* ShceduleOnGroups */}
      {sched.map((courseItem) => (
        <div>
        <div key={courseItem.course}> {courseItem.course}</div>
        <ScheduleOnGroups sched = {courseItem.groups}/>
        </div>
      ))}
       </div>
  );
};

export default scheduleOnCourses;
