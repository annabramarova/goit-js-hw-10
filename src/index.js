import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    seachField: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

refs.seachField.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));

function onSearchInput(e) {
  const countryName = e.target.value.trim();

  if (countryName === '') {
    clearContent();
    return;
  }

  fetchCountries(countryName)
    .then(onTermsCheck)
    .catch((error)=> {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        clearContent();
        return console.log(error);;
    });
}

function onTermsCheck(country) {
    if (country.length > 10) {
        Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
        );
        clearContent();
        return;
    }

    else if (country.length === 1) {
        clearContent(refs.countryList.innerHTML);
        renderCountryInfo(country);


    } else if (country.length > 1 && country.length <= 10) {
        clearContent(refs.countryInfo.innerHTML);
        renderCountryList(country);
    }
}

const renderCountryList = country => {
    const markup = country
        .map(({ name, flags }) => {
            return `<li><img src="${flags.svg}" alt="Flag of ${name.official}"
            width="30" hight="20"><b>${name.official}</p></li>`;})
        .join('');
    
    refs.countryList.innerHTML = markup;
}

const renderCountryInfo = country => {
  refs.countryInfo.innerHTML = country
    .map(({ name, capital, population, flags, languages }) => {
      return `<section><h1><img src="${flags.svg}" alt="${name.official
        }" width="100" height="60">&nbsp ${name.official}</h1>
      <p><span>Capital: </span>&nbsp ${capital}</p>
      <p><span>Population:</span>&nbsp ${population}</p>
      <p><span>Languages:</span>&nbsp ${Object.values(languages)}</p><section>`;
    })
    .join('');
}

function clearContent() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
