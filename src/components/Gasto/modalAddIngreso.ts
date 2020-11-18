import { hiddenElement, showElement } from '../../helpers/toggleElement';

const modal = document.querySelector('.modal__addIngreso') as HTMLElement;

export function openModal(): void {
  showElement(modal);

  const btnAdd = document.querySelector('.modal__addIngreso--btn');
  const monto = document.querySelector('#ingreso') as HTMLInputElement;

  btnAdd.addEventListener('click', () => addIngreso(Number(monto.value)));
  const btn__closeModal = document.querySelector('.close__addIngreso');

  btn__closeModal.addEventListener('click', () => {
    hiddenElement(modal);
    monto.value = '';
  });
}

function addIngreso(monto: number): void {
  if (monto > 0) {
    // TODO: sumar nuevo gasto al total
    return console.log(monto);
  }
}
