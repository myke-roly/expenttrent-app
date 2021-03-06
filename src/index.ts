import './styles';
import { firebase } from './firebase';
import { showFormAddGasto, hiddenFormAddGasto, addNewGasto } from './components/Gasto/formAdd';
import { data } from './firebase/firebase';
import { showList } from './components/Gasto/listItems';
import { openModal } from './components/Gasto/modalAddIngreso';
import { displayIngeso } from './components/Gasto/modalAddIngreso';
import { singIn } from './components/Login';
import { singUp } from './components/Register';
import { showCategories, categories } from './UI/listCategories';
import { printCanvasByMonth } from './components/Canvas/Mouth';
// import { printCanvasByDay } from './components/Canvas/Day';
// import { printCanvasByCompare } from './components/Canvas/Compare';
import { hiddenContent, hiddenElement, showElement } from './helpers/toggleElement';

const notEntries = document.querySelector('.not-entries');

const login = document.querySelector('.login') as HTMLElement;
const formLogin = document.querySelector('.login__form') as HTMLFormElement;

const register = document.querySelector('.register') as HTMLElement;
const formRegister = document.querySelector('.register__form') as HTMLFormElement;

const formAddNewGasto = document.querySelector('.form__add-gasto') as HTMLFormElement;
const cancel = document.querySelector('.cancel__add');
const add = document.querySelector('.btn__add');

const btn__openModal = document.querySelector('.open__addIngreso');
btn__openModal.addEventListener('click', openModal);

const canvas = document.querySelector('.canvas');

add.addEventListener('click', showFormAddGasto);
cancel.addEventListener('click', hiddenFormAddGasto);
// TODO: limpiar formulario
formAddNewGasto.addEventListener('submit', (e) => {
  addNewGasto(e);
  start();
  notEntries.innerHTML = '';
});

firebase.auth.onAuthStateChanged((user: any) => {
  if (user) {
    hiddenContent(login);
    hiddenElement(login);
    console.log('show');
    start();
  } else {
    showElement(login);
    console.log('hidden');
  }
});

function start() {
  displayIngeso();
  data
    .getGastos()
    .then((res) => {
      if (res.length <= 0) {
        notEntries.innerHTML = 'Sin entradas!';
        canvas.innerHTML = '';
        return null;
      }
      showCategories(categories);
      printCanvasByMonth(res);
      // printCanvasByDay();
      // printCanvasByCompare();
      showList(res);
    })
    .catch((err) => console.log(err));
}

// ─── FORM LOGIN ─────────────────────────────────────────────────────────────────
formLogin.addEventListener('submit', (e) => {
  singIn(e);
  start();
});

formRegister.addEventListener('submit', (e) => {
  singUp(e);
  start();
});

const loginLink = document.querySelector('#login-link') as HTMLElement;
const registerLink = document.querySelector('#register-link') as HTMLElement;

loginLink.addEventListener('click', () => {
  hiddenElement(login);
  showElement(register);
});

registerLink.addEventListener('click', () => {
  hiddenElement(register);
  showElement(login);
});

/**
 * Cerrar sesion
 */
document.querySelector('.logout').addEventListener('click', logOut);

function logOut() {
  firebase.logout();
  data.removeGastos();
  data.removeIngresos();
  login.classList.remove('hidden-elem');
}
