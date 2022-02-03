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

  getUser(userId: string, getUserCb: (data: TUser) => void) {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmMyZGVjZmU5YjdmMDAxNjU5ZDQ3YSIsImlhdCI6MTY0MzkyNDM0MSwiZXhwIjoxNjQzOTM4NzQxfQ.hhjsuz8p4HFMFd5P6Dgo3vvA4LG6a0ljdT5JaDmvuiY';

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
    dataUser: TUser,
    updateUserCb: (data: TUser) => void,
  ) {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmMyZGVjZmU5YjdmMDAxNjU5ZDQ3YSIsImlhdCI6MTY0MzkyNDM0MSwiZXhwIjoxNjQzOTM4NzQxfQ.hhjsuz8p4HFMFd5P6Dgo3vvA4LG6a0ljdT5JaDmvuiY';

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

  deleteUser(userId: string, deleteUserCb: (id: string) => void) {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmMyZGVjZmU5YjdmMDAxNjU5ZDQ3YSIsImlhdCI6MTY0MzkyNDM0MSwiZXhwIjoxNjQzOTM4NzQxfQ.hhjsuz8p4HFMFd5P6Dgo3vvA4LG6a0ljdT5JaDmvuiY';

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

  getNewUserToken(userId: string, getNewUserTokenCb: (data: TAuth) => void) {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmMyZGVjZmU5YjdmMDAxNjU5ZDQ3YSIsImlhdCI6MTY0MzkyNDM0MSwiZXhwIjoxNjQzOTM4NzQxfQ.hhjsuz8p4HFMFd5P6Dgo3vvA4LG6a0ljdT5JaDmvuiY';

    const promise = fetch(`${this.url}/users/${userId}/tokens`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    promise
      .then((result) => result.json())
      .then((result) => getNewUserTokenCb(result));
  }
}

export default new UsersApi('https://react-learn-words-together.herokuapp.com');
