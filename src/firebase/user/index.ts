import { hiddenContent, hiddenElement, showElement } from '../../helpers/toggleElement';
import firebase from '../firebase';

const login = document.querySelector('.login') as HTMLElement;

class User {
  public userData;
  constructor() {
    this.userData = firebase.auth.currentUser;
  }

  async authentication(): Promise<any> {
    firebase.auth.onAuthStateChanged((user: any) => {
      if (user) {
        hiddenContent(login);
        hiddenElement(login);
        console.log('show');
      } else {
        showElement(login);
        console.log('hidden');
      }
    });
  }

  getUserData() {
    return firebase.auth.currentUser;
  }
}

export const user = new User();
