import React, { useState, useEffect, useMemo } from 'react';
import TimePanel from '../timePanel/TimePanel';
import { useLocation, useParams } from 'react-router-dom';
import HeadlineGroups from '../headlineGroups/HeadlineGroups';
import ScheduleOnDays from '../scheduleOnDays/ScheduleOnDays';
import Header from '../header/Header';
import Group from '../group/Group';
import TeacherPage from '../TeacherPage/TeacherPage';
import { useSelector, useDispatch } from 'react-redux';
import './schedule.scss';
import CoursesPanel from '../coursesPanel/CoursesPanel';
import HeadlineTeachers from '../headlineTeachers/HeadlineTeachers';
import { defaultSchedule } from '../../data/defaultSchedule';
import DaysOfWeek from '../daysOfWeek/DaysOfWeek';
import '../../styles/global.scss';

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [filtered, setFiltered] = useState('grSepar');
  const [activeCourse, setActiveCourse] = useState(0);
  const { teacherName } = useParams(); // будет undefined, если не /teacher/:teacherName
  const location = useLocation();
  const mode = useSelector((state) => state.mode.modeState);

  const days = [0, 1, 2, 3, 4, 5];
  const [day, setDay] = useState({});

  useEffect(() => {
    try {
      const scheduleFromLocal = localStorage.getItem('schedule');
      const parsed = scheduleFromLocal ? JSON.parse(scheduleFromLocal) : null;

      if (parsed && Array.isArray(parsed) && parsed.length > 0) {
        setSchedule(parsed);
      } else {
        setSchedule(defaultSchedule);
      }
    } catch (error) {
      console.error('Ошибка парсинга localStorage:', error);
      setSchedule(defaultSchedule);
    }
  }, []);

  useEffect(() => {
    if (schedule.length > 0) {
      localStorage.setItem('schedule', JSON.stringify(schedule));
    }
  }, [schedule]);

  useEffect(() => {
    if (teacherName) {
      setFiltered(teacherName);
    } else if (location.pathname === '/teachers') {
      setFiltered('teach');
    } else if (location.pathname === '/teachersCompact') {
      setFiltered('teachComp');
    } else if (location.pathname === '/showGroupsUnited') {
      setFiltered('grUnited');
    } else if (location.pathname === '/teachersCol') {
      setFiltered('teachCol');
    } else {
      setFiltered('grSepar');
    }
  }, [location.pathname, teacherName]);

  const groupsByCourse = useMemo(() => {
    if (!schedule.length) return [];
    let result;
    let grouped = schedule.reduce((acc, { course, group }) => {
      if (!acc[course]) acc[course] = new Set();
      acc[course].add(group);
      return acc;
    }, {});

    result = Object.entries(grouped)
      .map(([course, groupSet]) => ({
        course: Number(course),
        groups: [...groupSet].sort(),
      }))
      .sort((a, b) => a.course - b.course);

    return activeCourse === 0
      ? result
      : result.filter((item) => item.course === activeCourse);
  }, [schedule, activeCourse]);

  const sortedCourseGroup = useMemo(() => {
    const result = groupsByCourse.flatMap((course) =>
      course.groups.map((group) => ({
        course: course.course,
        group,
      })),
    );
    // console.log('sortedCourseGroup', result);
    return result;
  }, [schedule, activeCourse]);

  const sortedGroups = useMemo(() => {
    const result = [];
    groupsByCourse.forEach((course) =>
      course.groups.forEach((group) => result.push(group)),
    );
    return result;
  }, [schedule, activeCourse]);

  // console.log('sortedGroups ', sortedGroups);

  const scheduleOnCourse = useMemo(() => {
    // let result = schedule;
    let result = [...schedule].sort((a, b) => {
      const groupCompare = a.group.localeCompare(b.group, 'uk');

      if (groupCompare !== 0) {
        return groupCompare;
      }
      return Number(a.course) - Number(b.course);
    });
    //  console.log('Отсортированный', result);
    if (activeCourse) {
      result = result.filter(
        (item) => Number(item.course) === Number(activeCourse) || item.isActive,
      );
    }
    // console.log('По курсам ', result);
    return result;
  }, [schedule, filtered, activeCourse]);

  const scheduleOnDaysForGroups = useMemo(() => {
    const result = scheduleOnCourse.reduce((acc, item) => {
      if (!acc[item.day]) acc[item.day] = [];
      acc[item.day].push({
        day: item.day,
        ...item,
      });
      return acc;
    }, {});
    // console.log('scheduleOnDaysForGroups', result);
    return result;
  }, [schedule, activeCourse]);

  const maxPairByDay = useMemo(() => {
    let result = {};
    Object.entries(scheduleOnDaysForGroups).map(([day, lessons]) => {
      if (!lessons.length) {
        result[day] = 0;
        return;
      }
      result[day] = Math.max(...lessons.map((lesson) => lesson.numbOfPair));
    });
    // console.log(result);
    return result;
  }, [schedule, activeCourse]);

  // Compact Teachers

  const { scheduleByDays, maxColumnsByTeacher } = useMemo(() => {
    if (!schedule.length) {
      return {
        scheduleByDays: {},
        maxColumnsByTeacher: {},
      };
    }

    const scheduleByDays = {};
    const maxColumnsByTeacher = {};

    schedule.forEach((lesson) => {
      const {
        id,
        isActive,
        day,
        teacher,
        numbOfPair,
        subj,
        type,
        week,
        group,
        course, 
      } = lesson;

      if (!scheduleByDays[day]) scheduleByDays[day] = [];

      const dayColumns = scheduleByDays[day];
      // console.log(day, 'dayColumns', dayColumns);

      let column = dayColumns.find((col) => {
        const first = col[0];
        if (!first) return false;

        if (first.teacher !== teacher) return false;
        //  if (Number(first.numbOfPair) !== Number(numbOfPair)) return false;

        if (first.week === 0 && week === 0) return true;

        if (
          (Number(first.week) === 1 && Number(week) === 2) ||
          (Number(first.week) === 2 && Number(week) === 1)
        ) {
          return true;
        }
        if (
          (Number(first.week) === 1 || Number(week) === 2) &&
          (Number(first.week) === 2 || Number(week) === 1)
        ) {
          return true;
        }

        return false;
      });

      if (!column) {
        column = [];

        // если пара раньше первой пары колонки → вставляем колонку в начало
        if (
          dayColumns.length &&
          Number(numbOfPair) < Number(dayColumns[0][0]?.numbOfPair)
        ) {
          dayColumns.unshift(column);
        } else {
          dayColumns.push(column);
        }
      }

      // Происходит формирование массива групп
      let pair = column.find(
        (p) =>
          p.subj === subj &&
          p.type === type &&
          Number(p.week) === Number(week) &&
          Number(p.numbOfPair) === Number(numbOfPair),
      );

      if (!pair) {
        pair = {
          day,
          numbOfPair,
          subj,
          type,
          week,
          teacher,
          groups: [],
        };
        column.push(pair);
      }

      const existingGroup = pair.groups.find((g) => g.name === group);

      if (!existingGroup) {
        pair.groups.push({
          name: group,
          isActive,
          id,
          course,
        });
      }
    });

    // подсчитываем максимальное количество колонок на преподавателя
    Object.values(scheduleByDays).forEach((columnsOfDay) => {
      const counter = {};
      columnsOfDay.forEach((col) => {
        const t = col[0]?.teacher;
        if (!t) return;
        counter[t] = (counter[t] || 0) + 1;
      });
      Object.entries(counter).forEach(([t, count]) => {
        maxColumnsByTeacher[t] = Math.max(maxColumnsByTeacher[t] || 0, count);
      });
    });

    return { scheduleByDays, maxColumnsByTeacher };
  }, [schedule]);
  // console.log(scheduleByDays);

// формирование структуры для преподов
const { scheduleTeachCol, arrPairsByDay, maxPairsForTeach } = useMemo(() => {
  if (!schedule.length) {
    return {
      scheduleTeachCol: {},
      arrPairsByDay: {},
      maxPairsForTeach: {},
    };
  }

  // const scheduleTeachCol = {};
  const maxPairsForTeach = {};
  const arrPairsByDay = {};
  
// Исходная функция
function scheduleUnitedGroups(schedule) {
  const merged = [];

  // копируем исходный массив, чтобы удалять обработанные элементы
  const remaining = [...schedule];

  while (remaining.length > 0) {
    const base = remaining.shift(); // берём первый объект
    const { day, teacher, numbOfPair, subj, type, week, group, id, course } = base;

    // создаём новый объект с массивом групп
    const newObj = {
      day: Number(day),
      teacher,
      numbOfPair: Number(numbOfPair),
      subj,
      type,
      week: Number(week),
      groups: [{ name: group, id, course }],
      id,
    };

    // ищем все элементы, которые совпадают по ключевым полям, но имеют другой week
    for (let i = remaining.length - 1; i >= 0; i--) {
      const curr = remaining[i];
      if (
        curr.day === base.day &&
        curr.teacher === base.teacher &&
        curr.numbOfPair === base.numbOfPair &&
        curr.subj === base.subj &&
        curr.type === base.type &&
        curr.week === base.week
      ) {
        // добавляем группу
        newObj.groups.push({
          name: curr.group,
          id: curr.id,
          course: curr.course,
        });
        // обновляем id через объединение
        // newObj.id = newObj.groups.map((g) => g.id).join('_');
        // удаляем из remaining
        remaining.splice(i, 1);
      }
    }

    merged.push(newObj);
  }

  return merged;
}

const scheduleWithGroups = scheduleUnitedGroups(schedule)
  // console.log('scheduleWithGroups', scheduleWithGroups);

  // функция для группировки по дням и преподам
function buildScheduleStructure(schedule) {
  const result = {};

  schedule.forEach((lesson) => {
    const { day, teacher, numbOfPair, week } = lesson;

    if (!result[day]) result[day] = [];

    let teacherBlock = result[day].find((t) => t.teacher === teacher);
    if (!teacherBlock) {
      teacherBlock = { teacher, lessons: [] };
      result[day].push(teacherBlock);
    }

    const lessons = teacherBlock.lessons;

    // week 0 всегда отдельный подмассив
    if (week === 0) {
      lessons.push([lesson]);
      return;
    }

    // ищем подмассив той же пары, где еще нет такого week
    let pairGroup = lessons.find(
      (g) =>
        g.length > 0 &&
        g[0].numbOfPair === numbOfPair &&
        !g.some((l) => l.week === week),
    );

    // если не нашли — создаем новый
    if (!pairGroup) {
      pairGroup = [];
      lessons.push(pairGroup);
    }

    pairGroup.push(lesson);
  });

  // сортировка по номеру пары
  Object.values(result).forEach((dayTeachers) => {
    dayTeachers.forEach((teacherBlock) => {
      teacherBlock.lessons.sort((a, b) => a[0].numbOfPair - b[0].numbOfPair);
    });
  });

  return result;
}

  // Выводим на консколь
 const scheduleTeachCol = buildScheduleStructure(scheduleWithGroups);
//  console.log('scheduleTeachCol', scheduleTeachCol);
 
  // формируем arrPairsByDay
     Object.entries(scheduleTeachCol).forEach(([day, dayTeachers]) => {
       const pairsCounter = {};

       dayTeachers.forEach((teacherBlock) => {
         const teacherPairs = {};

         teacherBlock.lessons.forEach((lesson) => {
           const pair = Number(lesson[0].numbOfPair);
           teacherPairs[pair] = (teacherPairs[pair] || 0) + 1;
         });

         Object.entries(teacherPairs).forEach(([pair, count]) => {
           pairsCounter[pair] = Math.max(pairsCounter[pair] || 0, count);
         });
       });

       arrPairsByDay[day] = pairsCounter;
     });
  return { scheduleTeachCol, arrPairsByDay, maxPairsForTeach };
}, [schedule]);

  // console.log('scheduleTeachCol', scheduleTeachCol);
  // console.log('arrPairsByDay', arrPairsByDay);

  const filteredScheduleByDays = useMemo(() => {
    if (
      filtered === 'grUnited' ||
      filtered === 'grSepar' ||
      filtered === 'teach' ||
      filtered === 'teachComp' ||
      filtered === 'teachCol'
    ) {
      return scheduleByDays;
    }

    // filtered = фамилия
    const result = {};

    Object.entries(scheduleByDays).forEach(([day, columns]) => {
      result[day] = columns.filter((col) => col[0]?.teacher === filtered);
    });

    return result;
  }, [filtered, scheduleByDays]);

  //  console.log('scheduleByDays', scheduleByDays);

  const isTeacherFilter = ![
    'grUnited',
    'grSepar',
    'teach',
    'teachComp',
  ].includes(filtered);

  const filteredMaxColumns = useMemo(() => {
    if (!isTeacherFilter) return maxColumnsByTeacher;

    return {
      [filtered]: maxColumnsByTeacher[filtered],
    };
  }, [filtered, maxColumnsByTeacher]);
  // console.log('scheduleByDays:', scheduleByDays);
  // console.log('maxColumnsByTeacher:', maxColumnsByTeacher);

  const teachSched = useMemo(() => {
    // console.log('🧮 Пересчёт teachSched');
    //  console.log('🧮 ', selectedTeacher );

    if (filtered !== 'teach') {
      return [
        {
          teacher: filtered,
          lessons: scheduleOnCourse.filter((item) => item.teacher === filtered),
        },
      ];
    }
    const teachers = [...new Set(scheduleOnCourse.map((item) => item.teacher))];

    return teachers.map((teacher) => ({
      teacher,
      lessons: scheduleOnCourse.filter((item) => item.teacher === teacher),
    }));
  }, [filtered, scheduleOnCourse, schedule]);

  const handleActiveCourse = (id) => {
    // console.log('clicked', id, 'mode:', mode);
    setActiveCourse(id);
  };

  const teachersSet = useMemo(() => {
    if (!Array.isArray(schedule)) return [];

    return [
      ...new Set(
        schedule.map((item) => item.teacher).filter(Boolean), // защита от пустых значений
      ),
    ].sort((a, b) => a.localeCompare(b, 'uk'));
  }, [schedule]);

  // console.log('teachersSet', teachersSet);

  const handleActive = (id) => {
    if (mode) {
      const newSchedule = schedule.map((item) =>
        item.id === id ? { ...item, isActive: true } : item,
      );
      setSchedule(newSchedule);
      console.log(id);
    }
  };

  const handleChangeField = (e, id) => {
    const { subj, value } = e.target;
    const newSchedule = schedule.map((item) =>
      item.id === id ? { ...item, subj: subj, value: value } : item,
    );
    setSchedule(newSchedule);
  };

  const handleSubmit = (e, id, formData) => {
    e.preventDefault();
    const newSchedule = schedule.map((item) =>
      item.id === id
        ? {
            ...item,
            isActive: false,
            teacher: formData.teacher,
            subj: formData.subj,
            group: formData.group,
            course: formData.course,
            type: formData.type,
          }
        : item,
    );
    setSchedule(newSchedule);
  };

  const handlePosition = (id, group, day, numbOfPair,  course, type='lec', subj='subj', teacher='teacher', week = 0) => {
    // if (!mode) return;

    const newPosition = {
      // id: crypto.randomUUID(),
      id: id || crypto.randomUUID(),
      numbOfPair,
      subj,
      day,
      group,
      course,
      type,
      teacher,
      isActive: true,
      week,
    };

    setSchedule((prev) => [...prev, newPosition]);
  };
  const handleDelete = (id) => {
    console.log('handleDelete ID ', id)
    const newSchedule = schedule.filter((item) =>{
    //  console.log('ITEM ID:', item.id); 
      return item.id !== String(id)});
    setSchedule(newSchedule);
  };

  const handlePairUp = (id) => {
    console.log(id);
    const newSchedule = schedule.map((item) =>
      item.id === id ? { ...item, week: 1, isActive: false } : item,
    );
    setSchedule(newSchedule);
  };

  const handlePairDown = (id) => {
    // console.log('Нижняя пара');
    // console.log(id)
    const newSchedule = schedule.map((item) =>
      item.id === id ? { ...item, week: 2, isActive: false } : item,
    );
    setSchedule(newSchedule);
  };

  const handlePairUnblink = (id) => {
    // console.log('handlePairUnblink');

    const isPairExists = schedule.find((i) => i.id === id);
    if (isPairExists.subj !== 'subj' && isPairExists.teacher !== 'teacher') {
      const newSchedule = schedule.map((item) =>
        item.id === id ? { ...item, week: 0, isActive: false } : item,
      );
      setSchedule(newSchedule);

      const current = newSchedule.find((i) => i.id === id);
      console.log('current ', current);
      const paired = newSchedule.find(
        (i) =>
          i.day === current.day &&
          i.numbOfPair === current.numbOfPair &&
          i.week !== current.week,
      );
      if (paired) {
        setSchedule(newSchedule.filter((id) => id !== paired.id));
      }
    } else {
      const newSchedule = schedule.map((item) =>
        item.id === id ? { ...item, isActive: false } : item,
      );
      setSchedule(newSchedule);
    }
  };

  const handleExchangeBlink = (id) => {
    // console.log('handleExchangeBlink', handleExchangeBlink);
    setSchedule((prev) => {
      // console.log('prev', prev);
      const current = prev.find((i) => i.id === id);
      if (!current) return prev;

      const paired = prev.find(
        (i) =>
          i.day === current.day &&
          i.numbOfPair === current.numbOfPair &&
          i.week !== current.week,
      );

      if (!paired) return prev;

      return prev.map((item) => {
        if (item.id === current.id)
          return { ...item, week: paired.week, isActive: false };
        if (item.id === paired.id) return { ...item, week: current.week };
        return item;
      });
    });
  };

  //  старый вариант
  // const handleSubmitForGroups = (e, formData, groups) => {
  //   e.preventDefault();
  //   console.log('formData', formData)
  //   const ids = groups.map((g) => g.id);
  //   console.log(groups[ids])

  //   const newSchedule = schedule.map((item) => {
  //     const updatedGroup = groups.find((g) => g.id === item.id);

  //     if (!updatedGroup) return item;
      
  //     return {
  //       ...item,
  //       subj: formData.subj,
  //       teacher: formData.teacher,
  //       type: formData.type,
  //       course: updatedGroup.course,
  //       group: updatedGroup.name, // 🔥 вот тут меняем название группы
  //     };
  //   });
    
  //   setSchedule(newSchedule);
  // }; 
 const handleSubmitForGroups = (e, formData, groups) => {
   e.preventDefault();

   const newSchedule = [...schedule];

   groups.forEach((group) => {
     const existingIndex = newSchedule.findIndex(
       (item) => item.id === group.id,
     );

     if (existingIndex !== -1) {
       // ✅ обновляем
       newSchedule[existingIndex] = {
         ...newSchedule[existingIndex],
         subj: formData.subj,
         teacher: formData.teacher,
         type: formData.type,
         course: group.course,
         group: group.name,
       };
     } else {
       // ✅ создаём НОВУЮ
       newSchedule.push({
         id: group.id,
         subj: formData.subj,
         teacher: formData.teacher,
         type: formData.type,
         course: group.course,
         group: group.name,
         day: Number(formData.day),
         numbOfPair: Number(formData.numbOfPair),
         week: Number(formData.week), // 🔥 ВАЖНО
         isActive: true, // 🔥 сразу активная
       });
     }
   });

   setSchedule(newSchedule);
 };


  return (
    <div>
      <Header
        setFiltered={setFiltered}
        filtered={filtered}
        teachersSet={teachersSet}
      />
      <CoursesPanel
        activeCourse={activeCourse}
        handleActiveCourse={handleActiveCourse}
      />
      {(filtered === 'grUnited' || filtered === 'grSepar') && (
        <HeadlineGroups groupsByCourse={groupsByCourse} />
      )}

      {(filtered === 'teachComp' || isTeacherFilter) && (
        <HeadlineTeachers maxColumnsByTeacher={filteredMaxColumns} />
      )}

      <div className="scheduleWithTime">
        <div className="zoneTime">
          <TimePanel />
        </div>
        <div className="scheduleGroups"></div>{' '}
        {/* {filtered === 'teachCol' && <div>Преподы</div>} */}
        {filtered === 'grSepar' && (
          <ScheduleOnDays
            mode="groups"
            filtered={filtered}
            scheduleOnDays={scheduleOnDaysForGroups}
            sortedCourseGroup={sortedCourseGroup}
            maxPairByDay={maxPairByDay}
            handleActive={handleActive}
            handleSubmit={handleSubmit}
            handlePosition={handlePosition}
            handleDelete={handleDelete}
            handleExchangeBlink={handleExchangeBlink}
            handlePairUp={handlePairUp}
            handlePairDown={handlePairDown}
            handlePairUnblink={handlePairUnblink}
          />
        )}
        {filtered === 'grUnited' && (
          <ScheduleOnDays
            mode="groups"
            filtered={filtered}
            scheduleOnDays={scheduleOnDaysForGroups}
            sortedCourseGroup={sortedCourseGroup}
          />
        )}
        {(filtered === 'teachComp' || isTeacherFilter) && (
          <ScheduleOnDays
            mode="teachers"
            scheduleOnDays={scheduleTeachCol}
            maxPairsForTeach={maxPairsForTeach}
            arrPairsByDay={arrPairsByDay}
            teachersSet={teachersSet}
            sortedCourseGroup={sortedCourseGroup}
            handleSubmitForGroups={handleSubmitForGroups}
            handleDelete={handleDelete}
            handlePosition={handlePosition}
            handleChangeField={handleChangeField}
          />
        )}
      </div>
    </div>
  );
};

export default Schedule;
