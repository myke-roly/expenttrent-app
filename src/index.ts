import './styles';
import { user, data } from './firebase';
import { showFormAddGasto, hiddenFormAddGasto, addNewGasto, DataFormAddGastoI } from './components/Gasto/formAdd';
import { Gasto, removeList, showList } from './components/Gasto/listItems';
import { singIn } from './components/Login';
import { singUp } from './components/Register';
import { showCategories, categories } from './UI/listCategories';
import { printCanvasByMonth } from './components/Canvas/Mouth';
import { hiddenElement, showElement } from './helpers/toggleElement';
import { clearSession, isAuth } from './helpers/local-storage';

const notEntries = document.querySelector('.not-entries');

const login = document.querySelector('.login') as HTMLElement;
const formLogin = document.querySelector('.login__form') as HTMLFormElement;

const register = document.querySelector('.register') as HTMLElement;
const formRegister = document.querySelector('.register__form') as HTMLFormElement;

const formAddNewGasto = document.querySelector('.form__add-gasto') as HTMLFormElement;
const cancel = document.querySelector('.cancel__add');
const add = document.querySelector('.btn__add');

const canvas = document.querySelector('.canvas');
const selectElement = document.querySelector('.canvas__months') as HTMLSelectElement;

const splash = document.querySelector('.splash') as HTMLElement;

let EXPENCES_DATA: Gasto[] | [] = [];

if (isAuth) {
  showElement(splash);
  hiddenElement(login);
}

add.addEventListener('click', showFormAddGasto);
cancel.addEventListener('click', hiddenFormAddGasto);
// TODO: limpiar formulario
formAddNewGasto.addEventListener('submit', (e) => {
  addNewGasto(e);
  notEntries.innerHTML = '';
});

user.auth.onAuthStateChanged((user: any) => {
  if (!user) {
    showElement(login);
    return;
  }
  start();
});

async function start() {
  data.removeIngresos();
  showElement(splash);

  data
    .getGastos()
    .then((res: Gasto[]) => {
      if (res.length <= 0) {
        notEntries.innerHTML = 'Sin entradas!';
        canvas.innerHTML = '';
        hiddenElement(splash);
        return;
      }

      EXPENCES_DATA = res;
      notEntries.innerHTML = '';
      // showCategories(categories, res);
      printCanvasByMonth(res);

      showList(res);
      hiddenElement(splash);
    })
    .catch((err) => console.log(err));
}

/***
 * Modify values to canvas by month
 */

selectElement.addEventListener('change', (e: Event): void => {
  const valueMonth = (<HTMLSelectElement>e.target).value;
  printCanvasByMonth(EXPENCES_DATA, valueMonth);
  showList(EXPENCES_DATA, valueMonth);
});

// ─── FORM LOGIN ─────────────────────────────────────────────────────────────────
formLogin.addEventListener('submit', singIn);

formRegister.addEventListener('submit', singUp);

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
  user.logout();
  data.removeGastos();
  data.removeIngresos();
  removeList();
  notEntries.innerHTML = '';
  clearSession();
}
