<script lang="ts">
	import { availablity } from '../stores';
	import type { Availablity } from '../types';

	export let title: string;
	export let type: 'totalRooms' | 'occupiedRooms' | 'availableRooms' | 'booked';

	let data = '...';

	availablity.subscribe((event: Availablity) => {
		if (!event) return;
		if (typeof event[type] === 'undefined') {
			data = '...';
		} else {
			data = event[type];
		}
	});
</script>

<p class="has-text-centered has-text-grey-lighter mb-1 is-size-4">{title}</p>
<p class="has-text-centered has-text-white is-size-4">{data}</p>