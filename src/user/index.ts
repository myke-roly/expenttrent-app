import firebase from '../firebase/firebase';

class User {
  public isAuth: boolean;
  constructor() {
    this.isAuth = false;
  }

  authentication() {
    firebase.auth.onAuthStateChanged((user: any) => {
      if (!user) {
        this.isAuth = false;
        localStorage.removeItem('auth__task');
        return -1;
      }
      this.isAuth = true;
      localStorage.setItem('auth__task', user?.l);
    });
  }
}

export const user = new User();
