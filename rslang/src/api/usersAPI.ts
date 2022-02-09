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

  loginUser(dataLogin: TUserBase, loginUserCb: (data: TUserBase) => void) {
    this.post('signin', dataLogin)
      .then((result) => {
        BaseAPI.handleError(result, USERS_API_ERRORS);
        return result.json();
      })
      .then((data) => loginUserCb(data))
      .catch((error) => {
        console.error(error);
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
    getNewUserTokenCb: (dataToken: TAuth) => void,
  ) {
    this.get(`users/${userId}/tokens`, {
      Authorization: `Bearer ${token}`,
    })
      .then((result) => {
        BaseAPI.handleError(result, USERS_API_ERRORS);
        return result.json();
      })
      .then((result) => getNewUserTokenCb(result))
      .catch((error) => {
        console.error(error);
      });
  }
}

export default new UsersAPI();
