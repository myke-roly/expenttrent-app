import { DataFormAddGastoI } from './formAdd';
import Img from '../../assets/alimentacion.png';

const displayListGastos = document.querySelector('.list__gastos') as HTMLElement;
const ListItemsElem = document.createElement('ul');
ListItemsElem.classList.add('items__gastos');

export function showList(items: DataFormAddGastoI[]): void {
  let itemElem: string = '';

  items.map((item) => {
    itemElem += `
    <li class="item__gastos">
      <h2><img src=${Img} /> ${item.description}</h2>
      <p>$ ${item.price}</p>
    </li>`;
  });

  ListItemsElem.innerHTML = itemElem;
  displayListGastos.appendChild(ListItemsElem);
}
