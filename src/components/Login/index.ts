import { hiddenContent, showElement } from '../../helpers/toggleElement';
import { showTemporalErrorMessage } from '../../UI/messageError';
import { firebase } from '../../firebase';
import { hiddenLoadinng, showLoading } from '../__shared/Loading';

interface DataLoginI {
  email: string;
  password: string;
}

const login = document.querySelector('.login') as HTMLElement;

function getValuesInputs(): DataLoginI {
  const email = document.querySelector('#login-email') as HTMLInputElement,
    password = document.querySelector('#login-password') as HTMLInputElement;

  return {
    email: email.value,
    password: password.value,
  };
}

export function singIn(e: Event): void {
  const btnLogin = document.querySelector('#login__submit') as HTMLButtonElement;
  const formLogin = document.querySelector('.login__form') as HTMLButtonElement;

  e.preventDefault();
  const { email, password } = getValuesInputs();
  showLoading(btnLogin);
  setTimeout(() => {
    firebase
      .singIn(email, password)
      .then((data) => {
        if (data !== 'success') {
          const error = showTemporalErrorMessage(data);
          formLogin.appendChild(error);
          return;
        }

        hiddenContent(login);
      })
      .catch((err) => console.log(err))
      .finally(() => hiddenLoadinng());
  }, 1000);
}
