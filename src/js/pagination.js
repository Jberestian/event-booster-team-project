import { DiscoveryAPI } from './discovery-api';
import Pagination from 'tui-pagination';
import { refs } from './refs';

const discoveryApi = new DiscoveryAPI();

export const option = {
  totalItems: 980,
  visiblePages: 5,
  itemsPerPage: 20,
};

export function startPagination() {
  const totalEl =
    discoveryApi.totalElements < 980 ? discoveryApi.totalElements : 980;
  option.totalItems = totalEl;

  const pagination = new Pagination(refs.pagination, option);
  pagination.on('beforeMove', function (e) {
    discoveryApi.setPage(e.page);
    refs.galleryList.innerHTML = '';
    discoveryApi.fetchEvents();
    console.log(e);
  });
}
