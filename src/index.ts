import './styles';
import { firebase } from './firebase';
import { user } from './user';
import { showFormAdd, hiddenFormAdd } from './components/FormCreate';

const root = document.querySelector('.root');
const form = document.querySelector('form');
const login = document.querySelector('.login');
const btnAdd = document.querySelector('.btn__add');
const cancelAdd = document.querySelector('.cancel__add');

const stateAddForm = {
  open: false,
};

btnAdd.addEventListener('click', () => {
  // stateAddForm.open = true;
  showFormAdd();
});

cancelAdd.addEventListener('click', hiddenFormAdd);

user.authentication();

const userData = new Promise((resolve, reject) => {
  setInterval(() => {
    if (user.isAuth) {
      resolve(user.getUserData());
      login.classList.add('form-hidden');
      console.log('user authenticated');
    } else {
      reject('no esta logueado');
    }
  }, 1000);
});

interface IRes {
  email: string;
}

userData
  .then((res: IRes) => {
    console.log(res?.email);
    const user = document.querySelector('.user');
    user.textContent = res?.email;
  })
  .catch((err) => console.log(err));

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
  firebase.singIn(email, password);

  form.reset();
});

/**
 * Print User data
 */
document.querySelector('.logout').addEventListener('click', () => {
  firebase.logout();
});
