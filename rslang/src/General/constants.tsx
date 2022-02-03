import Games from '../pages/games/games';
import Main from '../pages/main/main';
import Statistics from '../pages/statistics/statistics';
import Textbook from '../pages/textbook/textbook';
import { TPath } from './types';

export const Sections: TPath[] = [
  { id: 1, routePath: '/', title: 'Главная', element: <Main /> },
  { id: 2, routePath: '/games', title: 'Мини-игры', element: <Games /> },
  { id: 3, routePath: '/textbook', title: 'Учебник', element: <Textbook /> },
  {
    id: 4,
    routePath: '/statistics',
    title: 'Статистика',
    element: <Statistics />,
  },
];
