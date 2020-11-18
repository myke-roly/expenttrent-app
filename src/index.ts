import './styles';
import { firebase } from './firebase';
import { user } from './firebase/user';
import { showFormAddGasto, hiddenFormAddGasto, addNewGasto } from './components/Gasto/formAdd';
import { data } from './firebase/firebase';
import { showList } from './components/Gasto/listItems';
// const Img = require('./assets/alimentacion.png');
import Img from './assets/alimentacion.png';
import { showFormLogin } from './components/Login';
import { showCategories, categories } from './UI/listCategories';

import { hiddenModal, openModal } from './components/Gasto/modalAddIngreso';

const formLogin = document.querySelector('.login__form') as HTMLFormElement;
const login = document.querySelector('.login');

const formAddNewGasto = document.querySelector('.form__add-gasto') as HTMLFormElement;
const cancel = document.querySelector('.cancel__add');
const add = document.querySelector('.btn__add');

const btn__openModal = document.querySelector('.open__addIngreso');
const btn__closeModal = document.querySelector('.close__addIngreso');
btn__openModal.addEventListener('click', openModal);
btn__closeModal.addEventListener('click', hiddenModal);

add.addEventListener('click', showFormAddGasto);
cancel.addEventListener('click', hiddenFormAddGasto);
// TODO: limpiar formulario
formAddNewGasto.addEventListener('submit', addNewGasto);

user.authentication();

new Promise((resolve, reject) => {
  setTimeout(() => {
    if (user.isAuth) {
      login.classList.add('hidden-elem');
      resolve(user.getUserData());
    }
  }, 2000);
}).then((res: any) => {
  console.log(res);
  // ─── DISPLAY LIST ELEMTS ────────────────────────────────────────────────────────
  const displayListGastos = document.querySelector('.list__gastos') as HTMLElement;
  data.getGastos().then((res) => {
    showList(res, displayListGastos);
    showCategories(categories);
  });
});

// ─── FORM LOGIN ─────────────────────────────────────────────────────────────────
formLogin.addEventListener('submit', showFormLogin);

/**
 * Print User data
 */
// document.querySelector('.logout').addEventListener('click', logOut);

// function logOut() {
//   firebase.logout();
//   login.classList.remove('hidden-elem');
// }
