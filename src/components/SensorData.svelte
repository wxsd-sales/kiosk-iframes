<script>
	// @ts-nocheck
	import { telemetry } from '/src/stores.js';
	import { getColor } from '$lib/telemetry-color';
	export let title;
	export let icon;
	export let type;

	let color = 'white';
	let data = '...';

	const colorMatch = new getColor();

	telemetry.subscribe((event) => {
		if (typeof event.level === 'undefined') {
			data = '...';
			return;
		}

		if (type == 'peopleCount') {
			data = event.peopleCount + '/' + event.capacity;
		} else {
			data = event[type];
		}

		switch (type) {
			case 'peopleCount':
				color = colorMatch.getPeopleCountColor(event);
				break;
			case 'ambientTemp':
				color = colorMatch.getTempColor(event.ambientTemp);
				break;
			case 'relativeHumidity':
				color = colorMatch.getHumidityColor(event.relativeHumidity);
				break;
			case 'ambientNoise':
				color = colorMatch.getAmbientNoiseColor(event.ambientNoise);
				break;
			case 'airQuality':
				color = colorMatch.getAirQuality(event.airQuality);
				break;
		}
	});
</script>

<div class="is-flex-direction-column mt-2">
	<p class="has-text-weight-medium has-text-grey-lighter has-text-centered mb-1">{title}</p>
	<div class="level">
		<div class="level-item">
			<span class="icon is-medium has-text-link">
				<i class={`mdi mdi-${icon} mdi-24px`} />
			</span>
		</div>
		<div class={`level-item is-size-5 mr-3 has-text-${color}`}>{data}</div>
	</div>
</div>