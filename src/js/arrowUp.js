const arrowUp = document.querySelector('.scroll-up');

const showArrow = () => {
  if (window.pageYOffset < 100) {
    arrowUp.classList.add('no-show');
  } else {
    arrowUp.classList.remove('no-show');
  }
};

const onArrowUpClick = () => {
  window.scrollTo({ top: 0 });
};

window.addEventListener('scroll', showArrow);
arrowUp.addEventListener('click', onArrowUpClick);
