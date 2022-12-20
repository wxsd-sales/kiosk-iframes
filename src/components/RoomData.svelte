<script>
	// @ts-nocheck
	import { availablity } from '/src/stores.js';
	import { onMount } from 'svelte';

	export let title;
	export let type;

	let data = '...'

	onMount(async () => {
		availablity.subscribe((event) => {
		console.log('Availablity Changed')
		if (typeof event.totalRooms === 'undefined') {
			data = '...';
			return;
		}
		data = event[type];
	});
	});

</script>

<div class="is-size-6 is-flex-direction-column mt-0 ">
	<p class="has-text-grey-lighter has-text-centered mb-1">{title}</p>
	<div class="level is-justify-content-center has-text-white">
		{data}
	</div>
</div>
