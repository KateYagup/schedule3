import React from 'react';
import '../../styles/teachers.scss';

const GroupsSlot = ({groups}) => {
  return (
    <div className="groupsSlot">
      {groups.map((g) => (
        <div className="groupStyle" key={g.id}>{g.name}</div>
      ))}
    </div>
  );
}

export default GroupsSlot
