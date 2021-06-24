import { DataFormAddGastoI } from './formAdd';
import {
  comida,
  deporte as sport,
  internet,
  delivery,
  ropa,
  transporte,
  otros,
  alquiler,
  mascota,
} from '../../assets/';

const displayListGastos = document.querySelector('.list__gastos') as HTMLElement;
const ListItemsElem = document.createElement('ul');
ListItemsElem.classList.add('items__gastos');

export function removeList() {
  displayListGastos.innerHTML = '';
}

export interface Gasto {
  description: string;
  category: string;
  cant: number;
  price: number;
  createAt: any;
  creatorId: string;
  finalPrice: number;
}

export function showList(items: DataFormAddGastoI[]): void {
  let itemElem: string = '';

  const selectImg: any = {
    comida,
    sport,
    internet,
    delivery,
    ropa,
    transporte,
    otros,
    alquiler,
    mascota,
  };

  items.map((item: Gasto) => {
    itemElem += `
    <li class="item__gastos">
      <div class="item__gastos--info">
        <img src=${selectImg[item.category]} />
        <h2>
          <p>${item.cant} - ${item.description}</p>
          <small>${formattedDate(item.createAt.toMillis())}</small>
        </h2>
      </div>
      <p class="final-price">$ ${item.finalPrice}</p>
    </li>`;
  });

  ListItemsElem.innerHTML = itemElem;
  displayListGastos.appendChild(ListItemsElem);
}

function formattedDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString();
}
