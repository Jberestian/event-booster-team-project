import { DiscoveryAPI } from './js/discovery-api';
import { startPagination } from './js/pagination';
import { createEventList } from './js/createEventList';
import code from './countries.json';
import header from './js/header';
import loader from './js/loader';
import footer_modal from './js/footer_modal';
import modal from './js/modal';

import { refs } from './js/refs';
import { option } from './js/pagination';

const discoveryApi = new DiscoveryAPI();

const render = async () => {
  try {
    const { data } = await discoveryApi.fetchEvents();

    console.log(data.page);

    let event = data._embedded.events;

    createEventList(data._embedded.events);
    startPagination(data.page.totalElements);
  } catch (err) {
    console.log(err);
  }
};

render();

const chooseCountryMarkup = code
  .map(el => `<option value="${el.code}">${el.name}</option>`)
  .join('');
refs.element.insertAdjacentHTML('beforeend', chooseCountryMarkup);
