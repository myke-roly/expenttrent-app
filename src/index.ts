import './styles';
import { firebase } from './firebase';
import { user } from './firebase/user';
import { showFormAddGasto, hiddenFormAddGasto, addNewGasto } from './components/Gasto/formAdd';
import { data } from './firebase/firebase';
import { showList } from './components/Gasto/listItems';
import { openModal } from './components/Gasto/modalAddIngreso';
import { displayIngeso } from './components/Gasto/modalAddIngreso';
import { showFormLogin } from './components/Login';
import { showCategories, categories } from './UI/listCategories';
import { printCanvas } from './components/Gasto/test';

const formLogin = document.querySelector('.login__form') as HTMLFormElement;
const login = document.querySelector('.login') as HTMLElement;

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

const chart = printCanvas();
console.log(chart);

const displayListGastos = document.querySelector('.list__gastos') as HTMLElement;
data.getGastos().then((res) => {
  showList(res, displayListGastos);
  showCategories(categories);
  displayIngeso();
});

// ─── FORM LOGIN ─────────────────────────────────────────────────────────────────
formLogin.addEventListener('submit', showFormLogin);

/**
 * Print User data
 */
document.querySelector('.logout').addEventListener('click', logOut);

function logOut() {
  firebase.logout();
  login.classList.remove('hidden-elem');
}
