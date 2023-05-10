<script lang="ts">
	import '/src/app.scss';
	import { building, floor } from '../stores.js';
	import SensorData from '../components/SensorData.svelte';
	import RoomData from '../components/RoomData.svelte';

	export let title = 'Office Metrics';
	export let token: string | null = null;
	export let socket: WebSocket;

	console.log('SOCKET', socket);
	const demo = socket == null;
	console.log('Demo Mode: ' + demo);
	$: office = demo ? title + ' (Demo)' : `${$building} ${$floor}`;

	const sensors = [
		{ title: 'Temperature', icon: 'thermometer', type: 'ambientTemp' },
		{ title: 'Air Quality', icon: 'smoke', type: 'airQuality' },
		{ title: 'Humidity', icon: 'water-percent', type: 'relativeHumidity' },
		{ title: 'Noise', icon: 'waveform', type: 'ambientNoise' }
	];

	const rooms = [
		{ title: 'Total', type: 'totalRooms' },
		{ title: 'Occupied', type: 'occupiedRooms' },
		{ title: 'Available', type: 'availableRooms' }
		//{title: 'Booked', type:'booked'}
	];
</script>

<p class="subtitle has-text-white has-text-centered">{office}</p>
<div class="columns">
	{#each sensors as sensor}
		<div class="column px-0">
			<SensorData {demo} {...sensor} />
		</div>
	{/each}
</div>

<p class="subtitle has-text-white has-text-centered">Meeting Rooms</p>
<div class="columns">
	{#each rooms as room}
		<div class="column is-centered ">
			<RoomData {demo} {...room} />
		</div>
	{/each}
</div>
