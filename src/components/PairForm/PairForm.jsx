import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFloppyDisk,
  faTrash,
  faRightLeft,
  faCheck,
  faArrowUp,
  faArrowDown,
  faSquare,
  // faFloppyDiskCircleArrowRight
} from '@fortawesome/free-solid-svg-icons';
import './index.scss';

const PairForm = ({
  data,
  // id,
  // subj,
  // teacher,
  // group,
  // course,
  // item,
  // filtered,
  // activeCourse,
  // handleChangeField,
  handleSubmit,
  handleDelete,
  handleExchangeBlink,
  handlePairUp,
  handlePairDown,
  handlePairUnblink,
}) => {
  const {
    id,
    subj,
    day,
    course,
    numbOfPair,
    week,
    group,
    teacher,
    type,
    isActive,
  } = data;
  
  const [formData, setFormData] = useState({
    subj: subj || '',
    teacher: teacher || '',
    group: group || '',
    course: course || '',
    type: type || '',
  });
  // console.log('Значение из формы ', formData.group);

  const [hasEditedGroup, setHasEditedGroup] = useState(false);

  // useEffect(() => {
  //   // если у пары уже есть курс — не трогаем
  //   if (item?.course != null && item?.course !== '') return;
  //   //  if (formData.course !== '' && formData.course != null) return;

  //   setFormData((prev) => ({
  //     ...prev,
  //     course: activeCourse ?? '',
  //   }));
  // }, [activeCourse]);

  useEffect(() => {
    setFormData({
      subj: subj ?? '',
      teacher: teacher ?? '',
      group: group ?? '',
      // если у пары нет курса — подставляем activeCourse
      course: course ?? '',
      type: type ?? '',
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      subj: '',
      teacher: '',
      group: '',
      course: '',
      type: '',
    });
  };

  return (
    <div>
      <form
        className="pairForm"
        onSubmit={(e) => handleSubmit(e, id, formData)}
        action=""
      >
        {/* <div className="subjTypeCourse"> */}
          <input
            className="information"
            name="subj"
            type="text"
            value={formData.subj}
            onChange={handleChange}
          />
          <input
            className="information"
            name="type"
            type="text"
            style={{ width: '30px', marginRight: '5px' }}
            value={formData.type}
            placeholder="Тип"
            onChange={handleChange}
          />
          <input
            className="information"
            name="course"
            type="text"
            style={{ width: '15px' }}
            value={formData.course === 0 ? '' : formData.course}
            placeholder="Курс"
            // value={formData.course}
            onChange={handleChange}
          />
        {/* </div> */}
        {/* <div className="teacherGroup"> */}
          <input
            className="information"
            name="teacher"
            type="text"
            value={formData.teacher}
            onChange={handleChange}
          />
          <input
            className="information"
            name="group"
            type="text"
            value={formData.group}
            onChange={handleChange}
          />
        {/* </div> */}
        <div className="buttonsPanel">
          <button className="information" type="submit">
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button
            className="information"
            type="button"
            onClick={() => {
              handleDelete(id);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button
            className="combinedButton"
            onClick={() => {
              handleExchangeBlink(id);
            }}
          >
            <div className="combinedFonts">
              <FontAwesomeIcon
                className="firstIcon"
                icon={faArrowUp}
                style={{ fontSize: '8px' }}
              />
              <FontAwesomeIcon
                className="secondIcon"
                icon={faArrowDown}
                style={{ fontSize: '8px' }}
              />
            </div>
          </button>
          <button
            className="information"
            type="button"
            onClick={() => {
              handlePairUp?.(id);
            }}
          >
            {' '}
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <button
            className="information"
            type="button"
            onClick={() => {
              handlePairDown?.(id);
            }}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
          
          <button
            className="information"
            type="button"
            onClick={() => handlePairUnblink?.(id)}
          >
            <FontAwesomeIcon icon={faSquare} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PairForm;
