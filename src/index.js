import { DiscoveryAPI } from './js/discovery-api';
// import { refs } from './js/refs';
// import { option } from './js/pagination';
import { startPagination } from './js/pagination';
import { createEventList } from './js/createEventList';

const discoveryApi = new DiscoveryAPI();

const render = async () => {
  try {
    const { data } = await discoveryApi.fetchEvents();

    console.log(data.page);

    let event = data._embedded.events;

    createEventList(event);
    startPagination();
  } catch (err) {
    console.log(err);
  }
};

render();
