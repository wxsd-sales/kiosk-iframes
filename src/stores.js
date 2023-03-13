// @ts-nocheck
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import openWeather from './lib/weather';

// @ts-ignore
export const telemetry = writable({});
export const availablity = writable({});

export const weather = writable('Sunny');
export const temperature = writable('75');
export const city = writable('New York');

export const building = writable('');
export const floor = writable('');

export function connect(token) {

    if (!browser) return;

    //const location = 1233867
    const events = [
        "heartbeat",
        "location",
        "analytics",
        "floorAvailability",
        "deskAvailability",
    ]

    console.log('Setting up connection')
    let heartbeat
    let locationId = ''
    const socket = new WebSocket('wss://webex-api-server.dnaspaces.io/webexClient?token=' + token);

    socket.binaryType = "blob";

    // Open websocket and subscrib to events
    socket.onopen = (event) => {
        console.log('Sending Websocket setup')
        // for (let i = 0; i < events.length; i++) {
        //     socket.send(JSON.stringify({ "event": events[i], "location" : token}))
        // }
        // // Send heart beat every 30 sec
        // heartbeat = setInterval(() => {
        //     socket.send(JSON.stringify({ "event": "heartbeat", "location" : token },))
        // }, 30 * 1000)
    }

    // Process all incoming telemetry events
    socket.onmessage = (event) => {
        if (!event.data instanceof Blob) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
            const ws = JSON.parse(evt.target.result);
            //console.log(ws);
            updateTelemetry(ws.event, ws.data)
        };
        reader.readAsText(event.data);
    }

    // Reconnect if the websocket is closed
    socket.onclose = function (e) {
        console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
        clearTimeout(heartbeat)
        setTimeout(function () {
            connect();
        }, 1000);
    };

    // Close the websocket if we get an error
    socket.onerror = function (err) {
        console.error('Socket encountered error: ', err.message, 'Closing socket');
        socket.close();
    };

    function updateTelemetry(type, data) {
        switch (type) {
            case 'analytics':
                if (data.level != 'FLOOR') return;
                console.log('Floor Analytics Data Received')
                telemetry.set(data)
                break;
            case 'floorAvailability':
                console.log('Floor Availablity Data Received')
                availablity.set(data)
                break;
            case 'contextInfo':
                console.log('Context Information Received')
                building.set(data.building);
                if( data.floor == null){
                    console.log('Floor null, setting to blank')
                    floor.set('');
                } else {
                    console.log('Floor is not null')
                    floor.set(data.floor);
                }
                locationId = data.devicePath.pop();
                console.log('Location Id set to :' +locationId)
                console.log('Sending Websocket setup')
                for (let i = 0; i < events.length; i++) {
                    socket.send(JSON.stringify({ "event": events[i], "location" : locationId}))
                }
                // Send heart beat every 30 sec
                heartbeat = setInterval(() => {
                    socket.send(JSON.stringify({ "event": "heartbeat", "location" : locationId },))
                }, 30 * 1000)
                break;

        }
    }
}

export function monitorWeather(cityId, weatherToken, units, frequency) {
    if (!browser) return;

    console.log(`Monitoring Weather for CityId: ${cityId}`)
    const openweather = new openWeather(cityId, weatherToken, units);
    openweather.getWeather()
        .then(result => {
            weather.set(toUpper(result.weather[0].description));
            temperature.set(Math.round(result.main.temp))
            city.set(result.name)
        })

    setInterval(() => {
        openweather.getWeather()
            .then(result => {
                weather.set(toUpper(result.weather[0].description));
                temperature.set(Math.round(result.main.temp))
            })
    }, frequency * 60 * 1000)


    function toUpper(text) {
        const words = text.split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        return words.join(" ");
    }
}