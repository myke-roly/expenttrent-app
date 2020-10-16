import './styles';

import firebase from 'firebase';

function singIn(): void {
  const email = document.querySelector('#name') as HTMLElement,
    password = document.querySelector('#password') as HTMLElement,
    btn = document.querySelector('.btn-singin') as HTMLElement;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.singIn(email.nodeValue, password.nodeValue);
  });
}

singIn();
