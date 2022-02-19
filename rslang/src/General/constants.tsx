import Games from '../pages/games/games';
import Main from '../pages/main/main';
import Statistics from '../pages/statistics/statistics';
import TextbookEnglishLevels from '../pages/textbook/TextbookEnglishLevels/TextbookEnglishLevels';
import TextbookWords from '../pages/textbook/TextbookWords/TextbookWords';
import Dictionary from '../pages/textbook/Dictionary/Dictionary';
import Team from '../pages/team/team';

import { TPath } from './types';
import GameSprint from '../pages/games/GameSprint/GameSprint';
import GameAudio from '../Components/GameAudio/GameAudio';
import GameSprintLevel from '../pages/games/GameSprint/GameSprintLevel/GameSprintLevel';
import GameAudioLevel from '../Components/GameAudioLevel/GameAudioLevel';

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
  {
    id: 11,
    routePath: '/dictionary/:id',
    title: 'Словарь',
    element: <Dictionary />,
  },
];

const ROUTES_IN_NAV = [1, 2, 3, 5, 6];

export const Sections = ROUTES.filter((route) =>
  ROUTES_IN_NAV.includes(route.id),
);

export const ENGLISH_LEVELS = {
  0: {
    id: '0',
    code: 'A1',
    level: 'Elementary',
    img: '/assets/img/elementary.jpg',
    text: 'На этом уровне вы можете понимать и использовать знакомые повседневные выражения и простейшие фразы, направленные на решение конкретных задач. Представиться, представить других лиц, задавать простые вопросы личного характера, например «Где вы живете?», «Откуда вы?», уметь отвечать на такие вопросы. Поддерживать простейшую беседу, если собеседник говорит медленно, отчетливо и помогает вам.',
  },
  1: {
    id: '1',
    code: 'A2',
    level: 'Pre-Intermediate',
    img: '/assets/img/pre-intermediate.jpg',
    text: 'На этом уровне вы можете понимать употребительные выражения на общие темы, такие как: семья, покупки, работа и др. Разговаривать на простые повседневные темы, выражаясь простыми фразами. Рассказать простыми выражениями о себе, описывать простые ситуации. Телепередачи на английском не будут понятны, разве что отдельные слова, но собеседника, если он будет говорить отчетливо, простыми фразами в 2-3 слова в общем поймете.Уровень Pre-Intermediate можно назвать «уровнем для выживания», Survival English. Его достаточно для того, чтобы «выжить» во время поездки в страну, где основной язык английский.',
  },
  2: {
    id: '2',
    code: 'B1',
    level: 'Intermediate',
    img: '/assets/img/upper-intermediate.jpg',
    text: 'Словарного запаса и знаний грамматики достаточно, чтобы писать простые сочинения о себе, описывать случаи из жизни, написать письмо другу. Но в большинстве случаев устная речь отстает от письменной, вы путаете времена, думаете над фразой, делаете паузу, чтобы подобрать предлог (to или for?), но общаться более-менее можете, особенно если нет стеснительности или боязни ошибиться. Вы в общем понимаете фильмы и сериалы с субтитрами, если текст не очень сложный, и с некоторыми затруднениями понимаете общий смысл без субтитров.',
  },
  3: {
    id: '3',
    code: 'B2',
    level: 'Upper-Intermediate',
    img: '/assets/img/intermediate.jpg',
    text: 'Upper Intermediate – это уже хорошее, добротное, уверенное владение языком. Часто уровня Intermediate – Upper Intermediate хватает для многих задач. Например, нередко эмигранты владеют языком на этом уровне, и им этого хватает, чтобы жить и работать в англоязычной стране. Дойдя до этого уровня, многие забрасывают занятия на курсах, с репетитором и совершенствуют языковые навыки только с помощью практики.',
  },
  4: {
    id: '4',
    code: 'C1',
    level: 'Advanced',
    img: '/assets/img/advanced.jpg',
    text: 'Отличный уровень. Если вы общаетесь на понятные вам темы, вас могут принять за носителя языка. Вы свободно переписываетесь на английском, можете написать тексты разных жанров, используя стилистические приемы, изобразительно-выразительные средства языка. Вы понимаете на слух речь практически все, что слышите, за исключением сложных специальных моментов, без проблем смотрите фильмы, телепередачи.',
  },
  5: {
    id: '5',
    code: 'C2',
    level: 'Proficiency',
    img: '/assets/img/proficiency.jpg',
    text: 'Уровень образованного носителя языка. Вы понимаете практически все, можете в любой форме выразить любую мысль, используя тонкости языка. Иностранца в вас может выдать незнание культурных особенностей страны. К примеру, вы не поймете шутки из какого-нибудь телешоу 90-х, отсылку к популярной песне. Чтобы дойти до Proficiency желательно жить в англоязычной стране, постоянно общаться на английском языке и при этом сознательно и регулярно совершенствовать знание языка: много читать, писать, изучать разные тонкости.',
  },
};
