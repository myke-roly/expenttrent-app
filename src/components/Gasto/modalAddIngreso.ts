import { hiddenElement, showElement } from '../../helpers/toggleElement';

const modal = document.querySelector('.modal__addIngreso') as HTMLElement;
const displayIngresos = document.querySelector('#ingresos') as HTMLElement;

export function openModal(): void {
  showElement(modal);

  const btnAdd = document.querySelector('.modal__addIngreso--btn');
  const newIngreso = document.querySelector('#ingreso') as HTMLInputElement;

  btnAdd.addEventListener('click', () => addIngreso(Number(newIngreso.value)));
  const btn__closeModal = document.querySelector('.close__addIngreso');

  btn__closeModal.addEventListener('click', () => {
    hiddenElement(modal);
    newIngreso.value = '';
  });
}

function addIngreso(newIngreso: number): void {
  // get ingresos previos
  let ingresos: number = 0;

  // sumarle el nuevo valor ingresado
  if (newIngreso > 0) {
    ingresos += newIngreso;
    // guardar el nuevo valor en DB

    displayIngresos.textContent = ingresos.toString() + ' $';
    return;
  }

  // TODO: showMessageError
}
