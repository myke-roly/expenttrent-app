import app from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './config';

export class Firebase {
  public auth: firebase.auth.Auth;
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }

  async singIn(email: string, password: string) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  async createNewAccount(email: string, password: string) {
    return await this.auth.createUserWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }
}
const firebase = new Firebase();
export default firebase;
