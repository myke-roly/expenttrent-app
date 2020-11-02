import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import UI from '../UI/listGasto';
import { firebaseConfig } from './config';

app.initializeApp(firebaseConfig);
export class Firebase {
  public auth: firebase.auth.Auth;
  public db: firebase.firestore.Firestore;

  constructor() {
    this.auth = app.auth();
    this.db = app.firestore();
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

  getUserData() {
    return this.auth.currentUser;
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
  async addNewGasto(values: ValuesFormAddI): Promise<any> {
    const response = await this.db.collection('expences').add(values);
    console.log(response);
  }

  async getGastos(): Promise<any> {
    let data: any[] = [];
    await this.db
      .collection('expences')
      .get()
      .then((snapshot) => {
        snapshot.forEach((snap) => {
          data = [...data, snap.data()];
        });
      })
      .catch((error) => console.log(error));

    return data;
  }
}

export const data = new DataBase();
const firebase = new Users();

// const firebase = new Firebase();
export default firebase;
