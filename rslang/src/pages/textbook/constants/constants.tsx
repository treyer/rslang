export const DICTIONARY_CATEGORIES = {
  '0': {
    id: '0',
    filter:
      '{"userWord.difficulty":"difficult", "userWord.optional.isDifficult":true}',
    message: 'У Вас нет сложных слов в словаре.',
    activeBtn: true,
  },
  '1': {
    id: '1',
    filter:
      '{"$and":[{"userWord.difficulty":"difficult", "userWord.optional.isDifficult":true}]}',
    message: 'У Вас нет изучаемых слов в словаре.',
    activeBtn: true,
  },
  '2': {
    id: '2',
    filter:
      '{"$and":[{"userWord.difficulty":"difficult", "userWord.optional.deleted":true}]}',
    message: 'У Вас нет удаленных слов в словаре.',
    activeBtn: true,
  },
};

export const WORDS_PER_PAGE = '20';
