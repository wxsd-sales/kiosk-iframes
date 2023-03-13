<script lang='ts'>
	import { availablity } from '../stores.js';
	import { onMount } from 'svelte';
	import demoData from '../demoData';

	export let title: string;
	export let type: 'totalRooms' | 'occupiedRooms' | 'availableRooms';
	export let demo: boolean;

	let data = '...';

	onMount(async () => {
		availablity.subscribe((event: any) => {
			console.log('Availablity Changed');
			if (demo) {
				data = demoData.rooms[type];
				return;
			} else if ( typeof event[type] === 'undefined') {
				data = '...';
				return;
			}
			data = event[type];
		});
	});

	const rooms = [
		{title: 'Total', type: 'totalRooms'},
		{title: 'Occupied', type: 'occupiedRooms'},
		{title: 'Available', type: 'availableRooms'},
		//{title: 'Booked', type:'booked'}
	]

</script>

<p class="has-text-centered has-text-grey-lighter mb-1">{title}</p>
<p class="has-text-centered has-text-white">{data}</p>