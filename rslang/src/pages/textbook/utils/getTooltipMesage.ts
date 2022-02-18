import { DICTIONARY_CATEGORIES } from '../constants/constants';

export const getTooltipMessage = (currCategory?: string) => {
  switch (currCategory) {
    case '0':
      return DICTIONARY_CATEGORIES[currCategory].tooltipAddMessage;
    case '1':
      return DICTIONARY_CATEGORIES[currCategory].tooltipAddMessage;
    case '2':
      return DICTIONARY_CATEGORIES[currCategory].tooltipAddMessage;
    default:
      return 'Добавить в сложные слова';
  }
};
