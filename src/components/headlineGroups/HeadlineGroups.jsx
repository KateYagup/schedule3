import React from 'react';
import '../../styles/pairs.scss';
// import './headlineGroups.scss';

const HeadlineGroups = ({ groupsByCourse }) => {
  return (
    <div className="coursesHead">
      {groupsByCourse.map((item) => (
        <div key={item.course}>
          <div>{item.course}</div>
          <div className="groupsHead">
            {item.groups.map((group) => (
              <div className="group" key={group}>
                {group}{' '}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    // groupsByCourse.map(item )
  );
};

export default HeadlineGroups
