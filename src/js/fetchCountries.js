const URL = "https://restcountries.com/v3.1/name/"

export function fetchCountries(name) {
    return fetch(`${URL}${name}?fields=name,capital,population,flags,languages`)
        .then(r => {
            if (!r.ok || r.status === 404) {
                throw new Error(r.status);
            }
            return r.json();
        });
}
