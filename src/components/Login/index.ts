import { firebase } from '../../firebase';

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
  e.preventDefault();
  const { email, password } = getValuesInputs();
  firebase.singIn(email, password);

  // TODO: validar que no hay error;
  login.classList.add('hidden-elem');
}
