import Games from '../pages/games/games';
import Main from '../pages/main/main';
import Statistics from '../pages/statistics/statistics';
import TextbookEnglishLevels from '../pages/textbook/TextbookEnglishLevels/TextbookEnglishLevels';
import TextbookWords from '../pages/textbook/TextbookWords/TextbookWords';
import Team from '../pages/team/team';

import { TPath } from './types';

export const ROUTES: TPath[] = [
  { id: 1, routePath: '/', title: 'Главная', element: <Main /> },
  { id: 2, routePath: '/games', title: 'Мини-игры', element: <Games /> },
  {
    id: 3,
    routePath: '/textbook/englishLevels',
    title: 'Учебник',
    element: <TextbookEnglishLevels />,
  },
  {
    id: 4,
    routePath: '/textbook/words/:id',
    title: 'Учебник',
    element: <TextbookWords />,
  },
  {
    id: 5,
    routePath: '/statistics',
    title: 'Статистика',
    element: <Statistics />,
  },
  {
    id: 6,
    routePath: '/team',
    title: 'О команде',
    element: <Team />,
  },
];

const ROUTES_IN_NAV = [1, 2, 3, 5, 6];

export const Sections = ROUTES.filter((route) =>
  ROUTES_IN_NAV.includes(route.id),
);
