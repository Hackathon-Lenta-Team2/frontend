import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound404(): ReactElement {
  const navigate = useNavigate();

  const onClick = (): void => {
    navigate('/');
  };

  return (
    <div>
      <h1>Упс! Ошибка 404</h1>
      <p>Страница, которую вы запрашиваете, не существует :(</p>
      <button type="button" onClick={onClick}>
        Вернуться на главную
      </button>
    </div>
  );
}
