import axios from 'axios';

export class DiscoveryAPI {
  #BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events';
  #API_KEY = 'f7taAaeKnGfv1gEyfqhnhG0nPTy8fYIo';

  constructor() {
    this.searchQuery = '';
    this.page = 0;
    this.eventPageQuantity = 18;
    this.size = 20;
  }

  fetchEvents() {
    return axios.get(
      `${this.#BASE_URL}?apikey=${this.#API_KEY}&size=${
        this.eventPageQuantity
      }&page=${this.page}`
    );
  }

  searchEventsByName() {
    return axios.get(
      `${this.#BASE_URL}?apikey=${this.#API_KEY}&keyword=${
        this.searchQuery
      }&size=${this.eventPageQuantity}`
    );
  }

  setPage(page) {
    this.page = page;
  }
}
