import { TAuth, TUser, TUserBase } from './types';

export class UsersApi {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  createUser(dataUser: TUser, createNewUserCb: (data: TUser) => void) {
    const user = fetch(`${this.url}/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataUser),
    });
    user
      .then((result) => result.json())
      .then((newUser) => createNewUserCb(newUser));
  }

  getUser(userId: string, token: string, getUserCb: (data: TUser) => void) {
    const promise = fetch(`${this.url}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    promise.then((result) => result.json()).then((result) => getUserCb(result));
  }

  loginUser(dataLogin: TUserBase, loginUserCb: (data: TUserBase) => void) {
    const user = fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataLogin),
    });
    user.then((result) => result.json()).then((data) => loginUserCb(data));
  }

  updateUser(
    userId: string,
    token: string,
    dataUser: TUser,
    updateUserCb: (data: TUser) => void,
  ) {
    const promise = fetch(`${this.url}/users/${userId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataUser),
    });
    promise
      .then((result) => result.json())
      .then((result) => updateUserCb(result));
  }

  deleteUser(
    userId: string,
    token: string,
    deleteUserCb: (id: string) => void,
  ) {
    const promise = fetch(`${this.url}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    promise
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
    const promise = fetch(`${this.url}/users/${userId}/tokens`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    promise
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

export default new UsersApi('https://react-learn-words-together.herokuapp.com');
