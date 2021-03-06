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

export function showList(items: DataFormAddGastoI[]): void {
  let itemElem: string = `<li class="item__gastos item__gastos--title">
    <h2>Gastos</h2>
    <p>Precio</p>
  </li>`;

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

  items.map((item) => {
    itemElem += `
    <li class="item__gastos">
      <h2><img src=${selectImg[item.category]} /> ${item.description}</h2>
      <p>$ ${item.price}</p>
    </li>`;
  });

  ListItemsElem.innerHTML = itemElem;
  displayListGastos.appendChild(ListItemsElem);
}
