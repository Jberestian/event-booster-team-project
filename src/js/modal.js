const openModalBtn = document.querySelector('.event-gallery__list');
const closeModalBtn = document.querySelector('.modal__close');
const modal = document.querySelector('.backdrop');

const onOpen = event => {
  modal.classList.remove('is-hidden');

  if (event.target.nodeName === 'LI') {
    return;
  }
};

const onClose = event => {
  modal.classList.add('is-hidden');
};

document.addEventListener('keydown', event => {
  if (event.code === 'Escape') {
    return onClose();
  }
});

openModalBtn.addEventListener('click', onOpen);
closeModalBtn.addEventListener('click', onClose);

// -------------
