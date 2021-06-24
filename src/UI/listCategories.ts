import { comida, deporte, internet, delivery, ropa, transporte, otros, alquiler, mascota, servicios } from '../assets/';

const listCategories = document.querySelector('.header__categories') as HTMLElement;
interface CategoryI {
  title: string;
  img: string;
}

export const categories = [
  { title: 'comida', img: comida },
  { title: 'mascota', img: mascota },
  { title: 'internet', img: internet },
  { title: 'ropa', img: ropa },
  { title: 'transporte', img: transporte },
  { title: 'deporte', img: deporte },
  { title: 'delivery', img: delivery },
  { title: 'alquiler', img: alquiler },
  { title: 'servicios', img: servicios },
  { title: 'otros', img: otros },
];

export function showCategories(categories: CategoryI[]): void {
  listCategories.innerHTML = '';

  categories.map((category: CategoryI, index: number | string) => {
    const card = document.createElement('div') as HTMLElement;
    const title = document.createElement('p') as HTMLParagraphElement;
    const imgContent = document.createElement('div') as HTMLElement;
    const img = document.createElement('img') as HTMLImageElement;

    title.textContent = category.title;
    img.src = category.img;
    imgContent.append(img);

    card.setAttribute('id', index.toString());
    card.setAttribute('role', 'button');
    card.classList.add('header__categories--card');
    card.append(imgContent);
    card.append(title);

    card.addEventListener('click', () => filterByCategoty(category.title));

    listCategories.append(card);
  });
}

function filterByCategoty(category: string): void {
  console.log('filtrar por: ' + category);

  // TODO: mostrar lista de gastos dependiendo la categoria elegida.
}
