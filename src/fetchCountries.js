const BASE_URL = 'https://restcountries.com/v3.1/name/';
const PROP = '?fields=capital,flags,languages,name,population';
function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}${PROP}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(names => {
      return names;
    })
    .catch(error => {
      console.log(error);
    });
}

export { fetchCountries };
