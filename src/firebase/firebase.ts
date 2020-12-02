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

interface ValuesFormAddI {
  description: string;
  category: string;
  cant: number;
  price: number;
  finalPrice: number;
}

class DataBase extends Firebase {
  private data: any[];
  constructor() {
    super();
    this.data = [];
  }

  async addNewGasto(values: ValuesFormAddI): Promise<any> {
    const userId = this.auth.currentUser.uid;
    await this.db.collection('expences').add({ ...values, createAt: this.timestamp, creatorAt: userId });
  }

  async getGastos(): Promise<any> {
    let data: any[] = [];
    await this.db
      .collection('expences')
      .get()
      .then((snapshot) => {
        snapshot.forEach((snap) => {
          data = [...data, snap.data()];
          this.data = [...data, snap.data()];
        });
      })
      .catch((error) => console.log(error));

    return this.data;
  }

  removeGastos() {
    this.data = [];
  }

  async setIngreso(ingreso: number): Promise<any> {
    const userId = this.auth.currentUser.uid;
    await this.db
      .collection('ingreso')
      .add({ ingreso, createAt: this.timestamp, creatorAt: userId })
      .then((doc) => {
        console.log(doc.id);
        console.log(doc);
      })
      .catch((error) => {
        if (error) {
          showTemporalErrorMessage('No se pudo guardar!');
        }
      });
  }

  async getIngreso() {
    let data: any[] = [];
    await this.db
      .collection('ingreso')
      .get()
      .then((snapshot) => {
        snapshot.forEach((snap) => {
          data = [...data, snap.data()];
        });
      })
      .catch((error) => console.log(error));
    return data.reduce((acc, count) => acc + count.ingreso, 0);
  }
}

export const data = new DataBase();
const firebase = new Users();

// const firebase = new Firebase();
export default firebase;
