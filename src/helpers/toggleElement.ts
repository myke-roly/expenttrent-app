export function showElement(elem: HTMLElement): void {
  elem.classList.add('show-elem');
}

export function hiddenElement(elem: HTMLElement): void {
  elem.classList.remove('show-elem');
}
