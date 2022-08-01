import { DiscoveryAPI } from './discovery-api';
import Pagination from 'tui-pagination';
import { refs } from './refs';
import { createEventList } from './createEventList';

const discoveryApi = new DiscoveryAPI();

export function startPagination() {
  const options = {
    totalItems: 980,

    itemsPerPage: discoveryApi.size,
    visiblePages: window.outerWidth < 768 ? 3 : 5,
    page: 1,
    centerAlign: true,
  };
  const pagination = new Pagination(refs.pagination, options);

  pagination.on('beforeMove', function (eventData) {
    discoveryApi.page = eventData.page - 1;
    discoveryApi.fetchEvents();

    const nextPage = async () => {
      try {
        const { data } = await discoveryApi.fetchEvents();

        let event = data._embedded.events;

        refs.galleryList.innerHTML = event;

        createEventList(event);

      } catch (err) {
        console.log(err);
      }
    };
    nextPage();
  });
}

