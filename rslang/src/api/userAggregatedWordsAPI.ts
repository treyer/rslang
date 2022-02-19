import { BaseAPI } from './baseAPI';
import { USER_AGGREGATED_WORDS_API_ERRORS } from './errors';
import { TWord } from './types';

class UserAggregatedWordsAPI extends BaseAPI {
  getAggregatedUserWords(
    userId: string,
    token: string,
    getAggregatedUserWordsCb: (data: TWord[]) => void,
    group?: string,
    page?: string,
    wordsPerPage?: string,
    filter?: string,
    finallyCb = () => {},
  ) {
    const params = new URLSearchParams({
      ...(group ? { group } : {}),
      ...(page ? { page } : {}),
      ...(filter ? { filter } : {}),
      ...(wordsPerPage ? { wordsPerPage } : {}),
    }).toString();
    this.get(`users/${userId}/aggregatedWords?${params}`, {
      Authorization: `Bearer ${token}`,
    })
      .then((result) => {
        BaseAPI.handleError(result, USER_AGGREGATED_WORDS_API_ERRORS);
        return result.json();
      })
      .then((data) => {
        return getAggregatedUserWordsCb(data[0].paginatedResults);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => finallyCb());
  }
}

export default new UserAggregatedWordsAPI();
