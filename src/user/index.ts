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
    return firebase.auth.currentUser;
  }
}

export const user = new User();
