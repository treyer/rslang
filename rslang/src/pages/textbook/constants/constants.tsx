export const DICTIONARY_CATEGORIES = {
  '0': {
    id: '0',
    name: 'Сложные',
    filter:
      '{"userWord.difficulty":"difficult", "userWord.optional.isDifficult":true}',
    message: 'У Вас нет сложных слов в словаре.',
    activeBtn: true,
    tooltipAddMessage: 'Добавить в изученные слова',
    tooltipRemoweMessage: 'Удалить из сложных слов',
  },
  '1': {
    id: '1',
    name: 'Изучаемые',
    filter:
      '{"$and":[{"userWord.difficulty":"difficult", "userWord.optional.isDifficult":true}]}',
    message: 'У Вас нет изучаемых слов в словаре.',
    activeBtn: true,
    tooltipAddMessage: 'Добавить в изученные слова',
  },
  '2': {
    id: '2',
    name: 'Изученные',
    filter:
      '{"$and":[{"userWord.difficulty":"difficult", "userWord.optional.deleted":true}]}',
    message: 'У Вас нет удаленных слов в словаре.',
    activeBtn: true,
    tooltipAddMessage: 'Добавить в сложные слова',
  },
};

export const WORDS_PER_PAGE = '20';
