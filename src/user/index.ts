import firebase from '../firebase/firebase';

class User {
  public isAuth: boolean;
  public userData;
  constructor() {
    this.userData = firebase.auth.currentUser;
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

  getUserData() {
    const user = firebase.auth.currentUser;
    return user;
  }
}

export const user = new User();
