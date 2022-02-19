import { BaseAPI } from './baseAPI';
import { USERS_STATISTIC_API_ERRORS } from './errors';
import { TStatistic } from './types';

class UsersStatisticAPI extends BaseAPI {
  getStatistics(
    userId: string,
    token: string,
    getStatisticsCb: (data: TStatistic) => void,
    errorCb = (_error: Error) => {
      console.error(_error);
    },
  ) {
    this.get(`users/${userId}/statistics`, {
      Authorization: `Bearer ${token}`,
    })
      .then((result) => {
        BaseAPI.handleError(result, USERS_STATISTIC_API_ERRORS);
        return result.json();
      })
      .then((result) => getStatisticsCb(result))
      .catch((error) => errorCb(error));
  }

  upsetStatistics(
    userId: string,
    token: string,
    dataStatistics: TStatistic,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    upsetStatisticsCb = (data: TStatistic) => {},
    errorCb = (_error: Error) => {
      console.error(_error);
    },
  ) {
    this.put(`users/${userId}/statistics`, dataStatistics, {
      Authorization: `Bearer ${token}`,
    })
      .then((result) => {
        BaseAPI.handleError(result, USERS_STATISTIC_API_ERRORS);
        return result.json();
      })
      .then((result) => upsetStatisticsCb(result))
      .catch((error) => errorCb(error));
  }
}

export default new UsersStatisticAPI();
