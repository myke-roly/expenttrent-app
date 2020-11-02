const loading = document.createElement('p') as HTMLElement;
loading.classList.add('loading');

export function showLoading(parent: HTMLElement): void {
  parent.append(loading);
}

export function hiddenLoadinng() {
  loading.remove();
}
