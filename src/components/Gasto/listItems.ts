import { DataFormAddGastoI } from './formAdd';

const ListItemsElem = document.createElement('ul');
ListItemsElem.classList.add('items__gastos');

export function showList(items: DataFormAddGastoI[], parent: HTMLElement): void {
  let itemElem: string = '';
  items.map((item) => {
    itemElem += `
    <li class="item__gastos">
      <img src=${item.category}.png />
      <h2>${item.description}</h2>
      <p>${item.price}</p>
    </li>`;
  });

  ListItemsElem.innerHTML = itemElem;
  parent.appendChild(ListItemsElem);
}
