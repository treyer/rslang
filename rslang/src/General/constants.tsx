import React from 'react';
import Games from '../pages/games/games';
import Main from '../pages/main/main';
import Statistics from '../pages/statistics/statistics';
import Textbook from '../pages/textbook/textbook';
import { TPath } from './types';

export const Sections: TPath[] = [
  { routePath: '/', title: 'Главная', element: <Main /> },
  { routePath: '/games', title: 'Мини-игры', element: <Games /> },
  { routePath: '/textbook', title: 'Учебник', element: <Textbook /> },
  { routePath: '/statistics', title: 'Статистика', element: <Statistics /> },
];
