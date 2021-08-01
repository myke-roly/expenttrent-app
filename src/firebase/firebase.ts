import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);
export class Firebase {
  public auth: firebase.auth.Auth;
  public db: firebase.firestore.Firestore;
  public timestamp: firebase.firestore.FieldValue;

  constructor() {
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.timestamp = firebase.firestore.FieldValue.serverTimestamp();
  }
}
