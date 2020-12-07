import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { showTemporalErrorMessage } from '../UI/messageError';
import { firebaseConfig } from './config';

app.initializeApp(firebaseConfig);
export class Firebase {
  public auth: firebase.auth.Auth;
  public db: firebase.firestore.Firestore;
  public timestamp: firebase.firestore.FieldValue;

  constructor() {
    this.auth = app.auth();
    this.db = app.firestore();
    this.timestamp = app.firestore.FieldValue.serverTimestamp();
  }
}

class Users extends Firebase {
  async singIn(email: string, password: string): Promise<any> {
    return await this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => 'success')
      .catch((err) => err?.message);
  }

  async createNewAccount(email: string, password: string) {
    return await this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => 'success')
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

/**
 * DataBase
 */

interface ValuesFormAddI {
  description: string;
  category: string;
  cant: number;
  price: number;
  finalPrice: number;
}

class DataBase extends Firebase {
  private data: any[];
  private ingreso: any[];
  constructor() {
    super();
    this.data = [];
    this.ingreso = [];
  }

  async addNewGasto(values: ValuesFormAddI): Promise<any> {
    const userId = this.auth.currentUser.uid;
    await this.db.collection('expences').add({ ...values, createAt: this.timestamp, creatorId: userId });
  }

  async getGastos(): Promise<any> {
    this.data = [];
    const userId = this.auth.currentUser.uid;
    await this.db
      .collection('expences')
      .orderBy('createAt')
      .get()
      .then((snapshot) => {
        snapshot.forEach((snap) => {
          if (snap.data()?.creatorId === userId) {
            this.data = [...this.data, snap.data()];
          }
        });
      })
      .catch((error) => console.log(error));

    return this.data;
  }

  removeGastos() {
    this.data = [];
  }

  async setIngreso(ingreso: number): Promise<any> {
    this.ingreso = [];
    const userId = this.auth.currentUser.uid;
    await this.db
      .collection('ingreso')
      .add({ ingreso, createAt: this.timestamp, creatorId: userId })
      .then((doc) => {
        console.log(doc.id);
        // TODO: message success
      })
      .catch((error) => {
        if (error) {
          showTemporalErrorMessage('No se pudo guardar!');
        }
      });
  }

  async getIngreso() {
    const userId = this.auth.currentUser.uid;
    await this.db
      .collection('ingreso')
      .get()
      .then((snapshot) => {
        snapshot.forEach((snap) => {
          if (snap.data()?.creatorId === userId) {
            this.ingreso = [...this.ingreso, snap.data()];
          }
        });
      })
      .catch((error) => console.log(error));

    return this.ingreso.reduce((acc, count) => acc + count.ingreso, 0);
  }

  removeIngresos() {
    this.ingreso = [];
  }
}

export const data = new DataBase();
const firebase = new Users();

// const firebase = new Firebase();
export default firebase;
