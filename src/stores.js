// @ts-nocheck
import { writable } from 'svelte/store';
import {browser} from '$app/environment';
import { page } from '$app/stores';


// @ts-ignore
export const telemetry = writable({});



export function setupConnection(token,){

    if(!browser) return;

    const location = 1233867
    const events = [
        "heartbeat",
        "location",
        "analytics",
        "deskAvailability",
    ]

    console.log('Setting up connection')
    const socket = new WebSocket('wss://webex-api-server.dnaspaces.io/webexClient?token=' + token);

    socket.binaryType = "blob";

    socket.addEventListener('open', (event) => {
        console.log('Sending Websocket setup')
        for (let i = 0; i < events.length; i++) {
            socket.send(JSON.stringify({ "event": events[i], "location": location },))
        }
        // Send heart beat every 30 sec
        setInterval(()=>{
            socket.send(JSON.stringify({ "event": "heartbeat", "location": location },))
        }, 30*1000)
    });


    socket.addEventListener('message', (event) => {
        if (!event.data instanceof Blob) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
            const ws = JSON.parse(evt.target.result);
            //console.log(ws);
            updateTelemetry(ws.event, ws.data)
        };
        reader.readAsText(event.data);
    });

    function updateTelemetry(type, data) {
        if(type !== 'analytics') return;
        if(data.level !== 'FLOOR') return;
        console.log(data);
        telemetry.set(data)
    }
}