import { refs } from './refs';

export function createEventList(event) {
  let markup = event
    .map(
      event => `<li class="event-gallery__item">
        <span class="border"></span>
  
        <img class="event-gallery__img" src="${event.images[1].url}" alt="event-img" loading="lazy" width=300 height=190/>
  
        <div class="event-info">
          <p class="event-info__name">
            ${event.name}
          </p>
          <p class="event-info__date">
            ${event.dates.start.localDate}
          </p>
          <p class="event-info__location">
          <svg width="6" height="9" viewBox="0 0 6 9" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M3 0C1.34581 0 0 1.40339 0 3.12836C0 5.29645 3.00295 9 3.00295 9C3.00295 9 6 5.18983 6 3.12836C6 1.40339 4.65424 0 3 0ZM3.90516 4.04434C3.65558 4.30455 3.32781 4.43469 3 4.43469C2.67224 4.43469 2.34437 4.30455 2.09489 4.04434C1.59577 3.52392 1.59577 2.67709 2.09489 2.15662C2.33658 1.90448 2.65807 1.76561 3 1.76561C3.34193 1.76561 3.66337 1.90453 3.90516 2.15662C4.40428 2.67709 4.40428 3.52392 3.90516 4.04434Z" fill="white"/>
          </svg>
  
         ${event._embedded.venues[0].name}
          </p>
          
        </div>
        </li>`
    )
    .join('');
  return refs.galleryList.insertAdjacentHTML('beforeend', markup);
}
