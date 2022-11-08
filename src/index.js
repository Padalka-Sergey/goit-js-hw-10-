import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
let getEl = selector => document.querySelector(selector);

const input = getEl('#search-box');
const countryList = getEl('.country-list');
const countryInfo = getEl('.country-info');

input.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry(evt) {
  console.log('Input');
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  if (evt.target.value.length >= 1) {
    fetchCountries(evt.target.value.trim()).then(onMarkup).catch(onError);
  }
  return;
}

function onMarkup(dataCountry) {
  countryInfo.innerHTML = '';
  const markupCountry = dataCountry
    .map(
      item => `
            <li class="country-list-item">
            <div class="img-container">
            <img id="img"class ="img"src="${item.flags.svg}" alt="${item.name.official}" />
            </div>
            <p id="text">${item.name.official}</p>
        </li> `
    )
    .join('');
  if (dataCountry.length > 1) {
    countryList.insertAdjacentHTML('beforeend', markupCountry);
  }

  const markupInfo = dataCountry
    .map(
      item => `
            <ul>
              <li><strong>Capital: </strong>${item.capital}</li>
              <li><strong>Population: </strong>${item.population}</li>
              <li><strong>Languages: </strong>${
                Object.values(item.languages)[0]
              }</li>
            </ul> `
    )
    .join('');

  const markupCountryBig = dataCountry
    .map(
      item => `
            <li class="country-list-item">
            <div class="img-container-big">
            <img id="img"class ="img-big"src="${item.flags.svg}" alt="${item.name.official}" />
            </div>
            <p id="text"class ="text">${item.name.official}</p>
        </li> `
    )
    .join('');

  if (dataCountry.length === 1) {
    countryList.insertAdjacentHTML('beforeend', markupCountryBig);
    countryInfo.insertAdjacentHTML('beforeend', markupInfo);
  }

  if (dataCountry.length > 10) {
    countryList.innerHTML = '';
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.',
      {
        timeout: 3000,
      }
    );
    return;
  }
}

function onError() {
  Notiflix.Notify.failure('Oops, there is no country with that name', {
    timeout: 3000,
  });
}
