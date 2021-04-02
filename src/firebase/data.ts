import { showTemporalErrorMessage } from '../UI/messageError';
import { Firebase } from './firebase';

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
      .catch((error) => console.error(error));

    return this.ingreso.reduce((acc, count) => acc + count.ingreso, 0);
  }

  removeIngresos() {
    this.ingreso = [];
  }
}

export const data = new DataBase();
