import { hiddenLoadinng, showLoading } from '../__shared/Loading';
import { data } from '../../firebase/firebase';

const elemAddGasto = document.querySelector('.add-gasto');
const btn = document.querySelector('.btn__add') as HTMLButtonElement;
const btnAddGasto = document.querySelector('.btn__addgasto') as HTMLButtonElement;

export interface DataFormAddGastoI {
  description: string;
  category: string;
  cant: number;
  price: number;
}

// const initialState: StateFormAddI = {
//   data: null,
//   error: false,
//   loading: false,
// };

export function addNewGasto(e: Event): void {
  e.preventDefault();
  const { category, description, cant, price } = getValuesAddFormGasto();
  data.addNewGasto({ category, description, cant, price, finalPrice: cant * price });
  showLoading(btnAddGasto);

  setTimeout(() => {
    hiddenLoadinng();
    // TODO: validar que se guardaron los datos correcatamente
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
