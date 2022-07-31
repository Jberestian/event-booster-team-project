const openModalBtn = document.querySelector('.footer__text-link');
const closeModalBtn = document.querySelector('.footer-modal__close');
const modal = document.querySelector('.footer-backdrop');

const onOpen = event => {
  modal.classList.remove('is-hidden');
};

const onClose = event => {
  modal.classList.add('is-hidden');
};

openModalBtn.addEventListener('click', onOpen);
closeModalBtn.addEventListener('click', onClose);
