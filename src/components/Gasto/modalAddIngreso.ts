import { hiddenElement, showElement } from '../../helpers/toggleElement';
import { data } from '../../firebase';

const modal = document.querySelector('.modal__addIngreso') as HTMLElement;
const btnAdd = document.querySelector('.modal__addIngreso--btn');
const newIngreso = document.querySelector('#ingreso') as HTMLInputElement;
const btn__closeModal = document.querySelector('.close__addIngreso');

export function openModal(): void {
  showElement(modal);
  btnAdd.addEventListener('click', () => addIngreso(Number(newIngreso.value)));

  btn__closeModal.addEventListener('click', hiddenModal);
}

function hiddenModal() {
  hiddenElement(modal);
  newIngreso.value = '';
}

function addIngreso(newIngreso: number): void {
  // sumarle el nuevo valor ingresado

  if (newIngreso > 0) {
    data.setIngreso(newIngreso);
    hiddenModal();
    return;
  }
}
