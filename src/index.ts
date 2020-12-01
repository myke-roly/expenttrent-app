import './styles';
import { firebase } from './firebase';
import { user } from './firebase/user';
import { showFormAddGasto, hiddenFormAddGasto, addNewGasto } from './components/Gasto/formAdd';
import { data } from './firebase/firebase';
import { showList } from './components/Gasto/listItems';
import { openModal } from './components/Gasto/modalAddIngreso';
import { displayIngeso } from './components/Gasto/modalAddIngreso';
import { singIn } from './components/Login';
import { singUp } from './components/Register';
import { showCategories, categories } from './UI/listCategories';
import { CanvasMonthI, printCanvasByMonth } from './components/Canvas/Mouth';
import { printCanvasByDay } from './components/Canvas/Day';
import { printCanvasByCompare } from './components/Canvas/Compare';
import { hiddenContent, hiddenElement, showElement } from './helpers/toggleElement';

const login = document.querySelector('.login') as HTMLElement;
const formLogin = document.querySelector('.login__form') as HTMLFormElement;

const register = document.querySelector('.register') as HTMLElement;
const formRegister = document.querySelector('.register__form') as HTMLFormElement;

const formAddNewGasto = document.querySelector('.form__add-gasto') as HTMLFormElement;
const cancel = document.querySelector('.cancel__add');
const add = document.querySelector('.btn__add');

const btn__openModal = document.querySelector('.open__addIngreso');
btn__openModal.addEventListener('click', openModal);

add.addEventListener('click', showFormAddGasto);
cancel.addEventListener('click', hiddenFormAddGasto);
// TODO: limpiar formulario
formAddNewGasto.addEventListener('submit', addNewGasto);

user.authentication();

user.getUserData();

const displayListGastos = document.querySelector('.list__gastos') as HTMLElement;
export function start() {
  data.getGastos().then((res) => {
    displayIngeso();
    showCategories(categories);
    printCanvasByMonth(res);
    printCanvasByDay();
    printCanvasByCompare();
    showList(res, displayListGastos);
  });
}

start();

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
 * Print User data
 */
document.querySelector('.logout').addEventListener('click', logOut);

function logOut() {
  firebase.logout();
  login.classList.remove('hidden-elem');
}
