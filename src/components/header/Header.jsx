
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { toggleMode } from '../../store/modeSlice';
import './header.scss';
  
const Header = ({ teachersSet, filtered, setFiltered }) => {
  const mode = useSelector((state) => state.mode.modeState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');

  const CORRECT_PASSWORD = '123';

  const handleMode = () => {
    if (mode) {
      dispatch(toggleMode());
      return;
    }

    if (!showPasswordInput) {
      setShowPasswordInput(true);
      return;
    }

    if (password === CORRECT_PASSWORD) {
      dispatch(toggleMode());
      setShowPasswordInput(false);
      setPassword('');
    } else {
      alert('Неверный пароль');
    }
  };

  const confirmPassword = () => {
    if (password === CORRECT_PASSWORD) {
      dispatch(toggleMode());
      setShowPasswordInput(false);
      setPassword('');
      // reset();
    } else {
      alert('Неверный пароль');
    }
  };

  const getButtonText = () => {
    if (showPasswordInput) return 'Подтвердить пароль';
    return mode ? 'Режим просмотра' : 'Редактирование';
  };

  return (
    <div>
      <div className="modeString">
        Текущий режим: {mode ? 'Редактирование' : 'Просмотр'}
      </div>
      {/* <div>{filtered}</div>  */}

      <button onClick={handleMode}>{getButtonText()}</button>
      {showPasswordInput && (
        <input
          type="password"
          placeholder="Введіть пароль"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && confirmPassword()}
        />
      )}
      {/* <button onClick={() => dispatch(toggleMode())}>Изменить режим</button> */}
      <button
        onClick={() => {
          setFiltered('grSepar');
          navigate('/');
        }}
      >
        По групам
      </button>
      <button
        onClick={() => {
          setFiltered('grUnited');
          navigate('/showGroupsUnited');
        }}
      >
        По групам з об'єднанням
      </button>
      <button onClick={() => navigate('/teachers')}>По викладачам</button>
      <button
        onClick={() => {
          setFiltered('teachComp');
          navigate('/teachersCompact');
        }}
      >
        По викладачам компактно
      </button>
      <button
        onClick={() => {
          setFiltered('teachCol');
          navigate('/teachersCol');
        }}
      >
        Стовпці викладачів
      </button>
      <select
        value={
          filtered === 'gr' || filtered === 'teach' || filtered === 'teachCol'
            ? ''
            : filtered
        }
        onChange={(e) => {
          const value = e.target.value;

          if (value === '') {
            setFiltered('teachComp'); // все преподаватели
          } else {
            setFiltered(value); // конкретный преподаватель
          }
        }}
      >
        <option value="">Все преподаватели</option>

        {teachersSet.map((teacher) => (
          <option key={teacher} value={teacher}>
            {teacher}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Header;
