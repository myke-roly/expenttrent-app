import app from 'firebase/app';
import 'firebase/auth';
import { showTemporalErrorMessage } from '../helpers/messageError';
import { firebaseConfig } from './config';

export class Firebase {
  public auth: firebase.auth.Auth;
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }

  singIn(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password).catch((err) => {
      showTemporalErrorMessage(err?.message);
    });
  }

  async createNewAccount(email: string, password: string) {
    return await this.auth.createUserWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
    document.querySelector('.login').classList.remove('hidden');
  }
}
const firebase = new Firebase();
export default firebase;
