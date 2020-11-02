import { data } from '../../firebase/firebase';
import { DataFormAddGastoI, StateFormAddI } from './interface';

const elemAddGasto = document.querySelector('.add-gasto');

const initialState: StateFormAddI = {
  data: null,
  error: false,
  loading: false,
};

export function addNewGasto(e: Event): void {
  e.preventDefault();
  const { category, description, cant, price } = getValuesAddFormGasto();
  data.add({ category, description, cant, price, finalPrice: cant * price });

  setTimeout(() => {
    hiddenFormAddGasto();
  }, 2500);
}

export function showFormAddGasto(): void {
  console.log('boo');

  elemAddGasto.classList.add('show-elem');
}
export function hiddenFormAddGasto(): void {
  elemAddGasto.classList.remove('show-elem');
}

export function getValuesAddFormGasto(): DataFormAddGastoI {
  const description = document.querySelector('#description') as HTMLInputElement;
  const category = document.querySelector('#category') as HTMLSelectElement;
  const cant = document.querySelector('#cant') as HTMLInputElement;
  const price = document.querySelector('#price') as HTMLInputElement;

  return {
    description: description.value,
    category: category.value,
    cant: Number(cant.value),
    price: Number(price.value),
  };
}
