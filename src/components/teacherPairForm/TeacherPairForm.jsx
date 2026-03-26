import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {
  faFloppyDisk,
  faTrash,
  faRightLeft,
  faCheck,
  faArrowUp,
  faArrowDown,
  faSquare,
  faAdd,
  // faFloppyDiskCircleArrowRight
} from '@fortawesome/free-solid-svg-icons';

const TeacherPairForm = ({
  pair,
  handleSubmitForGroups,
  setEditingPairId,
  handleDelete,
  handlePosition,
  handleChangeField,
}) => {
  const { id, subj, day, numbOfPair, week, groups, teacher, type } = pair;
  // console.log('PAIR:', pair);
  console.log('GROUPS:', pair?.groups);
  // ✅ состояние активной группы
  const [activeGroupId, setActiveGroupId] = useState(null);

  const [formData, setFormData] = useState({
    subj: subj || '',
    teacher: teacher || '',
    type: type || '',
    day: day || '',
    numbOfPair: numbOfPair || '',
    week: week || 0,
    groups: groups || [],
  });

  useEffect(() => {
    setFormData({
      subj: subj ?? '',
      teacher: teacher ?? '',
      type: type ?? '',
      day: day ?? '',
      numbOfPair: numbOfPair ?? '',
      week: week ?? 0,
      groups: groups ?? [],
    });
  }, [id]); // ❗ только id

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // console.log('handleDelete:', handleDelete);
  return (
    <div>
      <form
        className="pairForm"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setEditingPairId(null);

          handleSubmitForGroups(e, formData, formData.groups);
        }}
      >
        <input
          className="information"
          name="subj"
          type="text"
          value={formData.subj}
          onChange={handleChange}
        />

        {/* ✅ группы */}
        <div style={{ border: '1px solid green' }}>
          {(formData.groups || []).map((group) => (
            <div
              key={group.id}
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              {activeGroupId === group.id ? (
                <>
                  <input
                    autoFocus
                    value={group.name}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        groups: prev.groups.map((g) =>
                          g.id === group.id ? { ...g, name: newValue } : g,
                        ),
                      }));
                    }}
                    onBlur={() => {setActiveGroupId(null)}}
                  />
                  {/* <input
                    value={group.course}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      console.log('course: ', newValue);

                      setFormData((prev) => ({
                        ...prev,
                        groups: prev.groups.map((g) =>
                          g.id === group.id
                            ? {
                                ...g,
                                course: newValue === '' ? '' : Number(newValue),
                              }
                            : g,
                        ),
                      }));
                    }}
                  /> */}

                  {formData.groups.length > 1 && ( // ✅ показываем кнопку только если групп больше 1
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        // console.log("Delete ID"+id);
                        handleDelete(group.id);
                      }}
                      // onMouseDown={(e) => {
                      //   e.preventDefault(); // предотвращаем blur
                      // setFormData((prev) => ({
                      //   ...prev,
                      //   groups: prev.groups.filter((g) => g.id !== group.id),
                      // }));
                      //   setActiveGroupId(null);
                      // }}
                      style={{
                        color: 'red',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  )}
                  {formData.groups.length === 1 && ( // показываем предупреждение
                    <span style={{ color: 'gray', marginLeft: '4px' }}>
                      Нельзя удалить последнюю группу
                    </span>
                  )}
                </>
              ) : (
                <div onClick={() => setActiveGroupId(group.id)}>
                  {group.name} {group.course}
                </div>
              )}
            </div>
          ))}
          <button
            onClick={() => {
              const firstGroup = pair.groups?.[0];
              const rawCourse = firstGroup?.course;
              const defaultCourse = Number.isFinite(Number(rawCourse))
                ? Number(rawCourse)
                : 1;
                console.log('defaultCourse', defaultCourse);
              // const defaultCourse = firstGroup?.course || 1;
              const id = crypto.randomUUID();
              console.log('id', id)
              console.log(pair.week)
              // создаём объект новой группы
              const newGroup = {
                id,
                name: 'КН-',
                course: defaultCourse,
                week: pair.week,
                isActive: true,
              };

              // сразу добавляем в локальный formData
              setFormData((prev) => ({
                ...prev,
                groups: [...prev.groups, newGroup],
              }));

              // добавляем в глобальный schedule
              // handlePosition(
              //   id,
              //   newGroup.name,
              //   Number(pair.day),
              //   Number(pair.numbOfPair),
              //   defaultCourse,
              //   // Number(1),
              //   pair.type,
              //   pair.subj,
              //   pair.teacher,
              //   Number(pair.week),
              // );

              // делаем её активной для редактирования
              setActiveGroupId(id);
            }}
          >
            <FontAwesomeIcon icon={faAdd} />
          </button>
        </div>
        <div className="buttonsPanel">
          <button className="information" type="submit">
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherPairForm;
// старый вариант
