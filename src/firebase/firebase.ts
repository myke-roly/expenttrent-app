import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
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
