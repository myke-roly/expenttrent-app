import firebase from '../firebase';

class Gastos {
  // private uid: string;
  public gastosData: any[];
  constructor() {
    this.gastosData = [];
  }

  async getGastos() {
    const uid = firebase.auth.currentUser.uid;
    const data = await firebase.database.ref(`/expences/${uid}`).once('value');
    const user = (data.val() && data.val().username) || 'Anonimus';

    console.log(user);
  }
}

export const gastos = new Gastos();
