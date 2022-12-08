const URL = "https://restcountries.com/v3.1/name/"

export async function fetchCountries(name) {
    const result = await fetch(`${URL}${name}?fields=name,capital,population,flags,languages`);
        if (!result.ok || result.status === 404) {
                throw new Error(result.status);
            }
    return result.json();
}
