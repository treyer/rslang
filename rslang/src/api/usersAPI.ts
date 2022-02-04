import { BaseAPI } from './baseAPI';
import { TAuth, TUser, TUserBase } from './types';

export class UsersAPI extends BaseAPI {
  createUser(dataUser: TUser, createNewUserCb: (data: TUser) => void) {
    this.post('users', dataUser)
      .then((result) => result.json())
      .then((newUser) => createNewUserCb(newUser));
  }

  getUser(userId: string, token: string, getUserCb: (data: TUser) => void) {    
    this.get(`users/${userId}`, {
      Authorization: `Bearer ${token}`,
    })
      .then((result) => result.json())
      .then((result) => getUserCb(result));
  }

  loginUser(dataLogin: TUserBase, loginUserCb: (data: TUserBase) => void) {
    this.post('signin', dataLogin)
      .then((result) => result.json())
      .then((data) => loginUserCb(data));
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
      .then((result) => result.json())
      .then((result) => updateUserCb(result));
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
        //  @todo use status code from http status code from package
        if (!result.ok && result.status !== 204) {
          throw new Error();
        }
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
        //  @todo use status code from http status code from package
        if (!result.ok && result.status === 401) {
          throw new Error();
        }
        return result.json();
      })
      .then((result) => getNewUserTokenCb(result))
      .catch((error) => {
        console.error(error);
      });
  }
}

export default new UsersAPI();
