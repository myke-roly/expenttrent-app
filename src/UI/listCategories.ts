const listCategories = document.querySelector('.header__categories') as HTMLElement;

interface CategoryI {
  title: string;
  img: string;
}

export const categories = [
  { title: 'Comida', img: 'https://assets.stickpng.com/thumbs/58af004d6c252499281ae910.png' },
  { title: 'Mascotas', img: 'https://assets.stickpng.com/thumbs/58af004d6c252499281ae910.png' },
  { title: 'Ropa', img: 'https://w7.pngwing.com/pngs/139/142/png-transparent-bulldog-paw-patrol-birthday-snout-birthday-holidays-orange-pet.png' },
  { title: 'Comida', img: 'https://assets.stickpng.com/thumbs/58af004d6c252499281ae910.png' },
  { title: 'Mascotas', img: 'https://assets.stickpng.com/thumbs/58af004d6c252499281ae910.png' },
  { title: 'Ropa', img: 'https://w7.pngwing.com/pngs/139/142/png-transparent-bulldog-paw-patrol-birthday-snout-birthday-holidays-orange-pet.png' },
];

export function showCategories(categories: CategoryI[]): void {
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
