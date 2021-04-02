import { hiddenElement } from '../../helpers/toggleElement';
import { showTemporalErrorMessage } from '../../UI/messageError';
import { user } from '../../firebase';
import { hiddenLoadinng, showLoading } from '../__shared/Loading';
import { Register } from '../../constants';

interface DataRegisterI {
  email: string;
  password: string;
}

const register = document.querySelector('.register') as HTMLElement;

function getValuesInputs(): DataRegisterI {
  const email = document.querySelector('#register-email') as HTMLInputElement,
    password = document.querySelector('#register-password') as HTMLInputElement;

  return {
    email: email.value,
    password: password.value,
  };
}

export function singUp(e: Event): void {
  const btnRegister = document.querySelector('#register__submit') as HTMLButtonElement;
  const formRegister = document.querySelector('.register__form') as HTMLButtonElement;

  e.preventDefault();
  const { email, password } = getValuesInputs();
  showLoading(btnRegister);
  setTimeout(() => {
    user
      .createNewAccount(email, password)
      .then((data) => {
        if (data !== Register.SUCCESS) {
          const error = showTemporalErrorMessage(data);
          formRegister.appendChild(error);
          return;
        }

        hiddenElement(register);
      })
      .catch((err) => console.log(err))
      .finally(() => hiddenLoadinng());
  }, 1000);
}
