const apiUrl = 'http://localhost:4000/';
const pageUrlPrefix = 'page/';

function loadPageConf(url, self) {
  request(pageUrlPrefix + url)
    .then(pageConf => {
      self.setState({
        isLoading: false,
        pageConf
      });
    })
    .catch(error => {
      self.setState({
        isLoading: false,
        error
      });
    });
}

function request(url) {
  return fetch(apiUrl + url)
    .then(res => res.json());
}

export { loadPageConf, request };
