import React from 'react'

const ScheduleOnPairs = ({sched}) => {


  return (
    <div>
      {sched.map(item => (
        <div>{item.subj}</div>
      ))}
    </div>
  );
}

export default ScheduleOnPairs
