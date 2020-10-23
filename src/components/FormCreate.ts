const add = document.querySelector('.add');

export function showFormAdd() {
  add.classList.add('show-form');
}
export function hiddenFormAdd() {
  add.classList.remove('show-form');
}

export function getValuesAddForm() {
  const description = document.querySelector(
    '#description',
  ) as HTMLInputElement;
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
