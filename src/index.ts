import './styles';
import { firebase } from './firebase';
import { user } from './firebase/user';
import { showFormAddGasto, hiddenFormAddGasto, addNewGasto } from './components/Gasto/formAdd';
import { data } from './firebase/firebase';
import { showList } from './components/Gasto/listItems';
// const Img = require('./assets/alimentacion.png');
import Img from './assets/alimentacion.png';

console.log(Img);
const formLogin = document.querySelector('.login__form') as HTMLFormElement;
const login = document.querySelector('.login');

const formAddNewGasto = document.querySelector('.form__add-gasto') as HTMLFormElement;
const cancel = document.querySelector('.cancel__add');
const add = document.querySelector('.btn__add');

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
  const displayEmail = document.querySelector('.user') as HTMLElement;
  displayEmail.innerText = res?.email;
  //
  // ─── DISPLAY LIST ELEMTS ────────────────────────────────────────────────────────
  //
  const displayListGastos = document.querySelector('.list__gastos') as HTMLElement;
  data.getGastos().then((res) => {
    showList(res, displayListGastos);
  });
});

//
// ─── FORM LOGIN ─────────────────────────────────────────────────────────────────
//

function getValuesInputs() {
  const email = document.querySelector('#email') as HTMLInputElement,
    password = document.querySelector('#password') as HTMLInputElement;

  return { email: email.value, password: password.value };
}

formLogin.addEventListener('submit', (e) => {
  e.preventDefault();
  const { email, password } = getValuesInputs();
  firebase.singIn(email, password);
  // todo: ocultar form si se loguea correctamente

  formLogin.reset();
});

/**
 * Print User data
 */
document.querySelector('.logout').addEventListener('click', () => {
  firebase.logout();
  login.classList.remove('form-hidden');
});
