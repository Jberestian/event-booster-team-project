import { DiscoveryAPI } from './js/discovery-api';

const discoveryApi = new DiscoveryAPI();

const refs = {
  galleryList: document.querySelector('.event-gallery__list'),
};

const render = async () => {
  try {
    const { data } = await discoveryApi.fetchEvents();

    console.log(data._embedded.events[0]);

    let event = data._embedded.events;

    createEventList(event);
  } catch (err) {
    console.log(err);
  }
};

render();

function createEventList(event) {
  let markup = event
    .map(
      event => `<li class="event-gallery__item">
      <img class="photo-card__img" src="${event.images[0].url}" alt="event-img" loading="lazy" width=300 height=190/>
      <div class="info">
        <p class="info-item">
          ${event.name}
        </p>
        <p class="info-item">
          ${event.dates.start.localDate}
        </p>
        
      </div>
      </li>`
    )
    .join('');
  return refs.galleryList.insertAdjacentHTML('beforeend', markup);
}
