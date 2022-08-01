import { DiscoveryAPI } from './discovery-api';

const openModalBtn = document.querySelector('.event-gallery__list');
const closeModalBtn = document.querySelector('.modal__close');
const modal = document.querySelector('.backdrop');
const modalCardInfo = document.querySelector('.modal__card');

const discoveryApi = new DiscoveryAPI();

const onOpen = event => {
  modal.classList.remove('is-hidden');

  if (event.target.nodeName === 'LI') {
    return;
  }
  fetchClickedEventsById();
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

async function fetchClickedEventsById(id) {
  try {
    const { data } = await discoveryApi.fetchEventsById(id);

    const newEvents = data._embedded.events.map(event => {
      return {
        id: event.id,
        url: event.url,
        name: event.name,
        info: event.info
          ? event.info
          : "More info will be soon, if you would like to know right now, please press our button 'MORE FROM THIS EVENTS' you will be searching in Google.",
        localDate: event.dates.start.localDate
          ? event.dates.start.localDate
          : '',
        localTime: event.dates.start.localTime
          ? `${event.dates.start.localTime}`.slice(0, 5)
          : '',
        timezone: event.dates.timezone ? event.dates.timezone : '',
        location: {
          latitude: event._embedded.venues[0].location
            ? event._embedded.venues[0].location.latitude
            : 0,
          longitude: event._embedded.venues[0].location
            ? event._embedded.venues[0].location.longitude
            : 0,
        },
        priceRangeType: (event.priceRanges && event.priceRanges[0].type) || '',
        priceRangeMin: (event.priceRanges && event.priceRanges[0].min) || '',
        priceRangeMax:
          (event.priceRanges && event.priceRanges[0].max) || 'no info',
        priceRangeCurrency:
          (event.priceRanges && event.priceRanges[0].currency) || '',
        placeName: event._embedded.venues[0].name,
        cityName: event._embedded.venues[0].city.name
          ? event._embedded.venues[0].city.name
          : 'More info will be soon',
        countryName: event._embedded.venues[0].country.name,
        image: event.images.find(img => {
          if (document.body.offsetWidth <= 480) {
            return img.url.includes('ARTIST_PAGE');
          }
          if (
            document.body.offsetWidth < 1280 &&
            document.body.offsetWidth > 480
          ) {
            return img.url.includes('RETINA_PORTRAIT_3_2');
          }
          if (document.body.offsetWidth >= 1280) {
            return img.url.includes('RETINA_LANDSCAPE');
          }
        }),
      };
    });
    renderInfoModal(...newEvents);
  } catch (error) {
    console.log(error);
  }
}

const renderInfoModal = events => {
  let timezone = '';
  if (events.timezone) {
    timezone =
      '(' +
      `${events.timezone}`.split('/')[1] +
      '/' +
      `${events.timezone}`.split('/')[0] +
      ')';
  }
  let priceRangeType = '';
  if (events.priceRangeType) {
    priceRangeType = `${events.priceRangeType}`.replace('s', 'S');
  }

  const markup = `<div class="modal__first-pic">
        <img id =${events.id} src="${events.image.url}" alt="mini poster" class="circle-pic">
      </div>
      <div class="modal__body">
        <div class="modal__main-pic">
          <img class="modal__img" src="${events.image.url}" />
        </div>
        <div class="modal__main-content">
          <h3 class="content__title">INFO</h3>
          <p class="content__txt" id = ${events.id}>${events.info}>
          
          </p>
          <h3 class="content__title">WHEN</h3>
          <p class="content__txt" id = ${events.id}>${events.localDate} <br>${events.localTime} ${timezone}</p>

          <h3 class="content__title">WHERE</h3>
          <a class="content__txt" target="_blank" href="http://maps.google.com/maps?q=${events.location.latitude},${events.location.longitude}&ll=${events.location.latitude},${events.location.longitude}&z=17" id = ${events.id} ${events.countryName} <br>${events.placeName}</a>

          <h3 class="content__title">WHO</h3>
          <p class="content__txt" id = ${events.id}>${events.name}</p>

          <h3 class="content__title">PRICES</h3>
          <div class="content__price">
            <!-- <svg class="content__price-svg"></svg> -->
            <ul>
               <li>
               <p class="content__txt" id=${events.id}>
               <svg class="content__price-svg"></svg>
                     ${priceRangeType} ${events.priceRangeMin} - ${events.priceRangeMax}  ${events.priceRangeCurrency}
                 </p>
                  <a href="${events.url}" target="_blank" class="modal__list-btn">
                  <button class="buy-btn" type="button">BUY TICKETS</button>
                  </a>
                 </li>
               </ul>
          </div>

          <div class="content__price">
            <svg class="content__price-svg"></svg>
            <p class="content__txt">
            PRICE NOT AVAILABLE
             </p>
          </div>
          <button class="buy-btn" type="button">BUY TICKETS</button>
        </div>
      </div>
       <button class="more-btn" type="button" data-id="${events.groupId}" >MORE FROM THIS AUTHOR</button>`;
  modalCardInfo.innerHTML = markup;

  const moreBtn = document.querySelector('.more-btn');
  function infoAboutAuthor(e) {
    window.open(`https://www.google.com/search?q=${events.name}`);
  }
  moreBtn.addEventListener('click', infoAboutAuthor);
};
