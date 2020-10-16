import app from 'firebase/app';
import { firebaseConfig } from './config';
import 'firebase/auth';

class Firebase {
  private auth;
  constructor() {
    if (!app.app.length) {
      app.initializeApp(firebaseConfig);
    } else {
      this.auth = app.auth();
    }
  }

  async singIn(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password);
  }

  async sinUp(email: string, password: string): Promise<any> {
    await this.auth.createUserWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }
}

const firebase = new Firebase();

export default firebase;
