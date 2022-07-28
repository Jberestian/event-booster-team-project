import { refs } from './refs';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { DiscoveryAPI } from './discovery-api';
import { createEventList } from './createEventList';

const discoveryApi = new DiscoveryAPI();

const onEventSerchInput = async event => {
  event.preventDefault();

  discoveryApi.searchQuery = event.target.value;
  refs.galleryList.innerHTML = '';

  try {
    const { data } = await discoveryApi.searchEventsByName();

    if (!data._embedded) {
      Notiflix.Notify.failure(
        'Sorry, there are no events matching your search query. Please try again.'
      );
      return;
    }

    createEventList(data._embedded.events);
  } catch (err) {
    console.log(err);
  }
};

const preventDefault = event => {
  event.preventDefault();
  discoveryApi.searchQuery = event.target.value;
};

refs.eventSearch.addEventListener('input', debounce(onEventSerchInput, 500));
refs.eventSearch.addEventListener('submit', preventDefault);
