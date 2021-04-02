import { Firebase } from './firebase';
import { Auth, Register, Session } from '../constants';

class User extends Firebase {
  async singIn(email: string, password: string): Promise<any> {
    return await this.auth
      .signInWithEmailAndPassword(email, password)
      .then((data: any) => {
        localStorage.setItem(Session.AUTH_FIREBASE, data?.l);

        return Auth.SUCCESS;
      })
      .catch((err) => err?.message);
  }

  async createNewAccount(email: string, password: string) {
    return await this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((data: any) => {
        localStorage.setItem(Session.AUTH_FIREBASE, data?.l);

        return Register.SUCCESS;
      })
      .catch((error) => {
        if (error) {
          console.log(error?.code);
          console.log(error?.message);
          return error?.message;
        }
      });
  }

  async logout() {
    await this.auth.signOut();
    document.querySelector('.login').classList.remove('hidden');
  }

  getUserData() {
    console.log(this.auth.currentUser);
    return this.auth.currentUser;
  }
}

export const user = new User();
