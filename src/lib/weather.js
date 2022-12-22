export default class openWeather {
    /**
     * @param {string} cityId
     * @param {string} token
     * @param {string} [units]
     */
    constructor(cityId, token, units) {
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
            // @ts-ignore
            .then(result => JSON.parse(result))
            .catch(error => console.log('error', error));
    }

    getCityName() {
        return fetch(this.request)
            .then(response => response.text())
            // @ts-ignore
            .then(result => JSON.parse(result).name)
            .catch(error => console.log('error', error));
    }
}