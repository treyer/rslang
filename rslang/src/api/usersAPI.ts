import { BaseAPI } from './baseAPI';
import { TAuth, TUser, TUserBase } from './types';
import { USERS_API_ERRORS } from './errors';

export class UsersAPI extends BaseAPI {
  createUser(
    dataUser: TUser,
    createNewUserCb: (error: string | null, data?: TUser) => void,
  ) {
    this.post('users', dataUser)
      .then((result) => {
        BaseAPI.handleError(result, USERS_API_ERRORS);
        return result.json();
      })
      .then((newUser) => createNewUserCb(null, newUser))
      .catch((error) => createNewUserCb(error.message));
  }

  getUser(userId: string, token: string, getUserCb: (data: TUser) => void) {
    this.get(`users/${userId}`, {
      Authorization: `Bearer ${token}`,
    })
      .then((result) => {
        BaseAPI.handleError(result, USERS_API_ERRORS);
        return result.json();
      })
      .then((result) => getUserCb(result))
      .catch((error) => {
        console.error(error);
      });
  }

  loginUser(
    dataLogin: TUserBase,
    loginUserCb: (error: string | null, data?: TAuth) => void,
  ) {
    this.post('signin', dataLogin)
      .then((result) => {
        BaseAPI.handleError(result, USERS_API_ERRORS);
        return result.json();
      })
      .then((data) => loginUserCb(null, data))
      .catch((error) => {
        loginUserCb(error.message);
      });
  }

  updateUser(
    userId: string,
    token: string,
    dataUser: TUser,
    updateUserCb: (data: TUser) => void,
  ) {
    this.put(`users/${userId}`, dataUser, {
      Authorization: `Bearer ${token}`,
    })
      .then((result) => {
        BaseAPI.handleError(result, USERS_API_ERRORS);
        return result.json();
      })
      .then((result) => updateUserCb(result))
      .catch((error) => {
        console.error(error);
      });
  }

  deleteUser(
    userId: string,
    token: string,
    deleteUserCb: (id: string) => void,
  ) {
    this.delete(`users/${userId}`, {
      Authorization: `Bearer ${token}`,
    })
      .then((result) => {
        BaseAPI.handleError(result, USERS_API_ERRORS);
      })
      .then(() => deleteUserCb(userId))
      .catch((error) => {
        console.error(error);
      });
  }

  getNewUserToken(
    userId: string,
    token: string,
    getNewUserTokenCb: (errorMessage: string | null, dataToken?: TAuth) => void,
  ) {
    this.get(`users/${userId}/tokens`, {
      Authorization: `Bearer ${token}`,
    })
      .then((result) => {
        BaseAPI.handleError(result, USERS_API_ERRORS);
        return result.json();
      })
      .then((result) => getNewUserTokenCb(null, result))
      .catch((error) => {
        getNewUserTokenCb(error.message);
      });
  }
}

export default new UsersAPI();
