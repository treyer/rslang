import { BaseAPI } from './baseAPI';
import { WORDS_API_ERRORS } from './errors';
import { TWord } from './types';

class UserAggregatedWordsAPI extends BaseAPI {
  getAggregatedUserWords(
    userId: string,
    token: string,
    getAggregatedUserWordsCb: (data: TWord[]) => void,
    group?: string,
    page?: string,
    filter?: string,
    wordsPerPage?: string,
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
        BaseAPI.handleError(result, WORDS_API_ERRORS);
        return result.json();
      })
      .then((data) => {
        return getAggregatedUserWordsCb(data[0].paginatedResults);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export default new UserAggregatedWordsAPI();
