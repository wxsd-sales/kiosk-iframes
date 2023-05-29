<script lang="ts">
	import '/src/app.scss';
	import { telemetry, availablity, building, floor } from '../stores';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import SensorData from '../components/SensorData.svelte';
	import RoomData from '../components/RoomData.svelte';
	import demoData from '../demoData';
	import type { Sensor, Room } from '../types';

	export let socket: WebSocket | undefined;

	let title = 'Loading...';

	const sensors: Array<Sensor> = [
		{ title: 'Temperature', icon: 'thermometer', iconColor: 'warning-dark', type: 'ambientTemp' },
		{ title: 'Air Quality', icon: 'weather-windy', iconColor: 'grey-light', type: 'airQuality' },
		{ title: 'Humidity', icon: 'water-percent', iconColor: 'link-dark', type: 'relativeHumidity' },
		{ title: 'Noise', icon: 'waveform', iconColor: 'danger-dark', type: 'ambientNoise' }
	];

	const rooms: Array<Room> = [
		{ title: 'Total', type: 'totalRooms' },
		{ title: 'Occupied', type: 'occupiedRooms' },
		{ title: 'Available', type: 'availableRooms' }
		//{title: 'Booked', type:'booked'}
	];

	building.subscribe((event: string) => {
		if (!browser) return;
		if (!event) return;
		if($floor){
			title = event + ' ' + $floor;
		} else {
			title = event;
		}
	});


	floor.subscribe((event: string) => {
		if (!browser) return;
		if (!event) return;
		if($building){
			title = $building + ' ' + event;
		} else {
			title = event;
		}
	});


	onMount(() => {
		if (!browser) return;

		if (!socket) {
			telemetry.set(demoData.telemetry);
			availablity.set(demoData.availablity);
			building.set(demoData.office.building);
			floor.set(demoData.office.floor);
		}
	});
</script>

<p class="title has-text-white is-4 has-text-centered">{title}</p>
<div class="columns">
	{#each sensors as sensor}
		<div class="column px-0 is-flex is-flex-direction-column">
			<SensorData {...sensor} />
		</div>
	{/each}
</div>

<p class="title has-text-white is-5 has-text-centered">Meeting Rooms</p>
<div class="columns">
	{#each rooms as room}
		<div class="column is-centered">
			<RoomData {...room} />
		</div>
	{/each}
</div>
