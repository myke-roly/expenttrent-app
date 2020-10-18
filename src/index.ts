import './styles';
import { firebase } from './firebase';
import { user } from './user';

const root = document.querySelector('.root');
const form = document.querySelector('form');
const login = document.querySelector('.login');

user.authentication();
setTimeout(() => {
  if (user.isAuth) {
    console.log();
    if (login.getAttribute('class') !== 'login hidden') {
      console.log(login);
      login.classList.add('hidden');
    }
    console.log('user authenticated');
  }
}, 1000);

/**
 * Form Login
 */

function getValuesInputs() {
  const email = document.querySelector('#email') as HTMLInputElement,
    password = document.querySelector('#password') as HTMLInputElement;

  return { email: email.value, password: password.value };
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const { email, password } = getValuesInputs();
  const s = firebase.singIn(email, password);
  s.then((d) => console.log(d));
});

document.querySelector('.logout').addEventListener('click', () => {
  firebase.logout();
});
