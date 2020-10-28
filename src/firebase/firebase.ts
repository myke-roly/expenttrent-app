import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import UI from '../UI/listGasto';
import { firebaseConfig } from './config';

app.initializeApp(firebaseConfig);
export class Firebase {
  public auth: firebase.auth.Auth;
  public database: firebase.database.Database;

  constructor() {
    this.auth = app.auth();
    this.database = app.database();
  }
}

class Users extends Firebase {
  singIn(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password).catch((err) => {
      UI.showTemporalErrorMessage(err?.message);
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

interface ValuesFormAddI {
  description: string;
  category: string;
  cant: number;
  price: number;
  finalPrice: number;
}

class DataBase extends Firebase {
  add(values: ValuesFormAddI) {
    this.database.ref('expences').set(values);
  }
}

export const data = new DataBase();
const firebase = new Users();

// const firebase = new Firebase();
export default firebase;
