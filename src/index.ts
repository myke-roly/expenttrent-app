import './styles';
import { firebase } from './firebase';
import { user } from './user';

user.authentication();
setInterval(() => {
  if (user.isAuth) {
    // TODO redireccionar a la pagina principal o cerrar modal
    console.log('user authenticated');
  }
}, 1000);

/**
 * Variables
 */
const form = document.querySelector('form');

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
