import './styles';
import { firebase } from './firebase';
import { user } from './user';
import {
  showFormAdd,
  hiddenFormAdd,
  getValuesAddForm,
} from './components/FormCreate';
import { data } from './firebase/firebase';

const formLogin = document.querySelector('.login__form') as HTMLFormElement;
const login = document.querySelector('.login');

const formAdd = document.querySelector('.add__form') as HTMLFormElement;
const btnAdd = document.querySelector('.btn__add');
const cancelAdd = document.querySelector('.cancel__add');

btnAdd.addEventListener('click', showFormAdd);
cancelAdd.addEventListener('click', hiddenFormAdd);
formAdd.addEventListener('submit', (e) => {
  e.preventDefault();
  const { category, description, cant, price } = getValuesAddForm();
  data.add({ category, description, cant, price, finalPrice: cant * price });

  formAdd.reset();
});

user.authentication();

const userData = new Promise((resolve, reject) => {
  setInterval(() => {
    console.log(user.isAuth);
    if (user.isAuth) {
      resolve(user.getUserData());
      login.classList.add('form-hidden');
      console.log('user authenticated');
    } else {
      reject('no esta logueado');
    }
  }, 1000);
});

//todo show or update info to the user
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

formLogin.addEventListener('submit', (e) => {
  e.preventDefault();
  const { email, password } = getValuesInputs();
  firebase.singIn(email, password);

  formLogin.reset();
});

/**
 * Print User data
 */
document.querySelector('.logout').addEventListener('click', () => {
  firebase.logout();
  login.classList.remove('form-hidden');
});
