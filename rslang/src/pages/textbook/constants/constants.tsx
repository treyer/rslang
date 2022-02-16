export const DICTIONARY_CATEGORIES = {
  '0': {
    id: '0',
    filter:
      '{"userWord.difficulty":"difficult", "userWord.optional.isDifficult":true}',
    message: 'У Вас нет сложных слов в словаре.',
  },
  '1': {
    id: '1',
    filter:
      '{"userWord.difficulty":"difficult", "userWord.optional.isDifficult":true}',
    message: 'У Вас нет изучученных слов в словаре.',
  },
  '2': {
    id: '2',
    filter: '{ "userWord.optional.deleted":true}',
    message: 'У Вас нет удаленных слов в словаре.',
  },
};
