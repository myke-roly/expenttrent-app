import { firebase } from '../../firebase';

function getValuesInputs() {
  const email = document.querySelector('#email') as HTMLInputElement,
    password = document.querySelector('#password') as HTMLInputElement;

  return {
    email: email.value,
    password: password.value,
  };
}

export function showFormLogin(e: Event) {
  e.preventDefault();
  const { email, password } = getValuesInputs();
  firebase.singIn(email, password);
}
