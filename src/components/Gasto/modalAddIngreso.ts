import { hiddenElement, showElement } from '../../helpers/toggleElement';

const modal = document.querySelector('.modal__addIngreso') as HTMLElement;
const displayIngresos = document.querySelector('#ingresos') as HTMLElement;
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

let ingresos: number = 0;
function addIngreso(newIngreso: number): void {
  // get ingresos previos

  // sumarle el nuevo valor ingresado
  if (newIngreso > 0) {
    ingresos += newIngreso;
    // guardar el nuevo valor en DB

    displayIngresos.textContent = ingresos.toString() + ' $';
    hiddenModal();

    return;
  }

  // TODO: showMessageError
}
