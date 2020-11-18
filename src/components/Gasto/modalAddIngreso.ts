const modal = document.querySelector('.modal__addIngreso') as HTMLElement;

export function openModal(): void {
  modal.classList.add('show-elem');

  const btnAdd = document.querySelector('.modal__addIngreso--btn');
  const monto = document.querySelector('#ingreso') as HTMLInputElement;

  btnAdd.addEventListener('click', () => addIngreso(Number(monto.value)));
}

export function hiddenModal(): void {
  modal.classList.remove('show-elem');
}

function addIngreso(monto: number): void {
  // TODO: sumar nuevo gasto al total
  console.log(monto);
}
