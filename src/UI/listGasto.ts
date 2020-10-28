class UI {
  constructor() {}

  showTemporalErrorMessage(message: string): void {
    const form = document.querySelector('.login__form');
    const messageError = document.createElement('p');
    messageError.textContent = message;
    messageError.classList.add('login__error');

    form.appendChild(messageError);
    setTimeout(() => messageError.remove(), 2500);
  }
}

export default new UI();
