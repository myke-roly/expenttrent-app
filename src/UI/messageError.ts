export function showTemporalErrorMessage(message: string): HTMLElement {
  const messageError = document.createElement('p');
  messageError.textContent = message;
  messageError.classList.add('login__error');

  setTimeout(() => messageError.remove(), 2500);

  return messageError;
}
