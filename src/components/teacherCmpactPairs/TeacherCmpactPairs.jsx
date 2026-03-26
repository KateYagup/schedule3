import React from 'react'

const TeacherCmpactPairs = ({pair}) => {
    const { subj, numbOfPair } = pair;
// const maxNumbOfPair = Math.max(numbOfPair);


  return (
    <div>
      {subj} {numbOfPair}
      
    </div>
  )
}

export default TeacherCmpactPairs
