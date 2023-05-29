<script lang="ts">
	import { telemetry } from '../stores';
	import type { Telemetry } from '../types';
	import getColor from '$lib/telemetry-color';
	
	export let title: string;
	export let icon: string;
	export let iconColor: string;
	export let type: 'ambientTemp' | 'airQuality' | 'relativeHumidity' | 'ambientNoise';

	let color = 'white';
	let data = '...';

	telemetry.subscribe((event: Telemetry) => {
		if (!event) return;

		if (typeof event.level === 'undefined') {
			data = '...';
		} else {
			if (type in event) {
				color = getColor.processTelemetry(type, event[type]);
				data = event[type];
			}
		}
	});
</script>

<p class="has-text-weight-medium has-text-grey-lighter has-text-centered mb-1 is-size-4">{title}</p>

<div class="is-flex is-flex-direction-row is-justify-content-center">
	<span class="icon is-medium has-text-{iconColor}">
		<i class={`mdi mdi-${icon} mdi-36px`} />
	</span>
	<div class={`is-size-5 pl-2 has-text-${color}`}>{data}</div>
</div>