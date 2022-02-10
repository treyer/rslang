import Games from '../pages/games/games';
import Main from '../pages/main/main';
import Statistics from '../pages/statistics/statistics';
import TextbookEnglishLevels from '../pages/textbook/TextbookEnglishLevels/TextbookEnglishLevels';
import TextbookWords from '../pages/textbook/TextbookWords/TextbookWords';
import Team from '../pages/team/team';

import { TPath } from './types';
import GameSprint from '../pages/games/GameSprint/GameSprint';
import GameAudio from '../pages/games/GameAudio/GameAudio';
import GameSprintLevel from '../pages/games/GameSprint/GameSprintLevel/GameSprintLevel';
import GameAudioLevel from '../pages/games/GameAudio/GameAudioLevel/GameAudioLevel';

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
  {
    id: 7,
    routePath: '/games/sprint',
    title: 'Мини-игры',
    element: <GameSprint />,
  },
  {
    id: 8,
    routePath: '/games/audio',
    title: 'Мини-игры',
    element: <GameAudio />,
  },
  {
    id: 9,
    routePath: '/games/sprint/:id',
    title: 'Мини-игры',
    element: <GameSprintLevel />,
  },
  {
    id: 10,
    routePath: '/games/audio/:id',
    title: 'Мини-игры',
    element: <GameAudioLevel />,
  },
];

const ROUTES_IN_NAV = [1, 2, 3, 5, 6];

export const Sections = ROUTES.filter((route) =>
  ROUTES_IN_NAV.includes(route.id),
);
