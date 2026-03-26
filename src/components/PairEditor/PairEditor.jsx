import React, { useState, useEffect } from 'react';
import './pairEditor.scss';

const PairEditor = ({
  id,
  subj,
  teacher,
  handleDelete,
  handleSaveChanges
}) => {
  const [subjEdit, setSubjEdit] = useState(subj);

  useEffect(() => {
    // console.log('👀 Новый subj из props:', subj);
    setSubjEdit(subj);
  }, [subj]);
  
  return (
    <div>
      <input
        className="information"
        name="subj"
        type="text"
        value={subjEdit}
        onChange={(e) => setSubjEdit(e.target.value)}
      />
      <input
        className="information"
        name="teacher"
        type="text"
        value={teacher}
        // onChange={handleChange}
      />
      <button
        className="information"
        onClick={() => handleSaveChanges(subjEdit, id)}
      >
        Зберегти
      </button>
      <button
        className="information"
        type="button"
        onClick={() => {
          //  console.log('🔥 ЗБЕРІГАЄМО:', subjEdit, id);
          // console.log('Клик по кнопке удалить:', id);
          handleDelete(id);
        }}
      >
        Видалити
      </button>
    </div>
  );
};

export default PairEditor;
