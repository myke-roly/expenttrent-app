const listCategories = document.querySelector('.header__categories') as HTMLElement;

interface CategoryI {
  title: string;
  img: string;
}

export const categories = [
  { title: 'comida', img: 'https://assets.stickpng.com/thumbs/58af004d6c252499281ae910.png' },
  { title: 'internet', img: 'https://assets.stickpng.com/thumbs/58af004d6c252499281ae910.png' },
  { title: 'ropa', img: 'https://cdn.iconscout.com/icon/free/png-256/fast-food-1851561-1569286.png' },
  { title: 'transporte', img: 'https://assets.stickpng.com/thumbs/58af004d6c252499281ae910.png' },
  { title: 'deporte', img: 'https://assets.stickpng.com/thumbs/58af004d6c252499281ae910.png' },
  { title: 'delivery', img: 'https://assets.stickpng.com/thumbs/58af004d6c252499281ae910.png' },
  {
    title: 'alquiler',
    img: 'https://cdn.iconscout.com/icon/free/png-256/fast-food-1851561-1569286.png',
  },
  { title: 'otros', img: 'https://cdn.iconscout.com/icon/free/png-256/fast-food-1851561-1569286.png' },
  {
    title: 'alquiler',
    img: 'https://cdn.iconscout.com/icon/free/png-256/fast-food-1851561-1569286.png',
  },
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
