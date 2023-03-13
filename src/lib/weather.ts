export default class openWeather {
    request: RequestInfo | URL;

    constructor(cityId: string, token: string, units: 'standard' | 'imperial' | 'metric') {
        console.log('Openweather contructor called')
        const url = 'https://api.openweathermap.org/data/2.5/weather'
        const query = {
            id: `${cityId}`,
            appid: `${token}`,
            units: `${units}`
        };
        const parms = new URLSearchParams(query).toString();
        this.request = new Request(url + '?' + parms, {
            method: 'GET',
            redirect: 'follow'
        });
    }

    getWeather() {
        return fetch(this.request)
            .then(response => response.text())
            .then(result => JSON.parse(result))
            .catch(error => console.log('error', error));
    }
}