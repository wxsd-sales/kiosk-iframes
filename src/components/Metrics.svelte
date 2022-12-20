<script>
	// @ts-nocheck
	import '/src/app.scss';
	import { connect } from '/src/stores.js';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import SensorData from '/src/components/SensorData.svelte';
	import RoomData from '/src/components/RoomData.svelte';

	export let title = 'Office Metrics';
	export let token = null;

	const sensors = [
		{title: 'Temperature', icon: 'thermometer', type:'ambientTemp'},
		{title: 'Air Quality', icon: 'smoke', type:'airQuality'},
		{title: 'Humidity', icon: 'water-percent', type:'relativeHumidity'},
		{title: 'Noise', icon: 'waveform', type:'ambientNoise'}
	];
	
	const rooms = [
		{title: 'Total', type: 'totalRooms'},
		{title: 'Occupied', type:'occupiedRooms'},
		{title: 'Available', type:'availableRooms'},
		{title: 'Booked', type:'booked'}
	]

	onMount(async () => {
		// Setup Websocket using token
		if (token != null) {
			connect(token);
		}
	});
</script>

<p class="subtitle has-text-white mb-0 is-flex is-justify-content-center">{title}</p>
<nav class="level px-3">
	{#each sensors as sensor}
	<div class="level-item has-text-centered">
		<SensorData {...sensor} />
	</div>
	{/each}
</nav>

<p class="subtitle has-text-white mb-2 is-flex is-justify-content-center">Meeting Rooms</p>
<nav class="level ">
	{#each rooms as room}
	<div class="level-item has-text-centered ">
		<RoomData {...room} />
	</div>
	{/each}
</nav>