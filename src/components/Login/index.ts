import { firebase } from '../../firebase';
import { hiddenLoadinng, showLoading } from '../__shared/Loading';

interface DataLoginI {
  email: string;
  password: string;
}

const login = document.querySelector('.login');

function getValuesInputs(): DataLoginI {
  const email = document.querySelector('#email') as HTMLInputElement,
    password = document.querySelector('#password') as HTMLInputElement;

  return {
    email: email.value,
    password: password.value,
  };
}

export function showFormLogin(e: Event): void {
  const btnLogin = document.querySelector('.form__btn') as HTMLButtonElement;
  e.preventDefault();
  const { email, password } = getValuesInputs();
  showLoading(btnLogin);
  firebase.singIn(email, password);

  setTimeout(() => {
    hiddenLoadinng();
    login.classList.add('hidden-elem');
  }, 2000);
}
