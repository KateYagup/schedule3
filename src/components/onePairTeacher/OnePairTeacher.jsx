import React from 'react';
import '../../styles/pairs.scss';

const OnePairTeacher = ({pair}) => {
  // console.log('pair!!!', pair);
  
return (
  <div className='pairCell'>
    {pair.map((pos, i) => {
      let className = 'pairCell';

      if (pos.week === 1) className = 'pairCell__firstWeek';
      if (pos.week === 2) className = 'pairCell__secondWeek';

      return (
        <div key={i} className={className}>
          {`${pos.subj} ${pos.type} ${pos.course}`}
          {pos.groups.map((group) => (
            <div>{group.name}</div>
          ))}
        </div>
      );
    })}
  </div>
);


  // return <div className="pairCell">{pair.subj}</div>;
}

export default OnePairTeacher
