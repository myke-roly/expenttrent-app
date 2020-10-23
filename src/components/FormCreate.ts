const add = document.querySelector('.add');
const formAdd = document.querySelector('.add__form');

export function showFormAdd() {
  add.classList.add('show-form');
}
export function hiddenFormAdd() {
  add.classList.remove('show-form');
}
