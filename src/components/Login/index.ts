import { hiddenElement } from '../../helpers/toggleElement';
import { showTemporalErrorMessage } from '../../UI/messageError';
import { user } from '../../firebase';
import { hiddenLoadinng, showLoading } from '../__shared/Loading';
import { Auth } from '../../constants';

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

export async function singIn(e: Event): Promise<void> {
  e.preventDefault();

  const btnLogin = document.querySelector('#login__submit') as HTMLButtonElement;
  const formLogin = document.querySelector('.login__form') as HTMLButtonElement;

  const { email, password } = getValuesInputs();
  showLoading(btnLogin);
  await user
    .singIn(email, password)
    .then((data) => {
      if (data !== Auth.SUCCESS) {
        const error = showTemporalErrorMessage(data);
        formLogin.appendChild(error);
        return;
      }

      hiddenElement(login);
    })
    .catch((err) => console.log(err))
    .finally(() => hiddenLoadinng());
}
