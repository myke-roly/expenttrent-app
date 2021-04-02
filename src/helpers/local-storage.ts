import { Session } from '../constants';

export const isAuth = !!window.localStorage.getItem(Session.AUTH_FIREBASE) || false;

export function setSession(token: string): void {
  window.localStorage.setItem(Session.AUTH_FIREBASE, token);
}

export function clearSession(): void {
  window.localStorage.removeItem(Session.AUTH_FIREBASE);
}
