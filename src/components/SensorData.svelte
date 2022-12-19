<script>
	// @ts-nocheck
	import { telemetry } from '../stores.js';
	import { getColor } from '../lib/telemetry-color';
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
				color = colorMatch.getAirQuality(event.ambientNoise);
				break;
		}
	});
</script>

<div class="is-flex is-flex-direction-column mt-4">
	<p class="has-text-weight-medium has-text-grey-lighter has-text-centered mb-2">
		{title}
	</p>

	<div class="level is-size-4 has-text-white">
		<div class="level-left has-text-grey-light">
			<span class="icon is-medium has-text-link">
				<i class={`mdi mdi-${icon} mdi-24px`} />
			</span>
		</div>
		<div class={`level-right is-size-6 has-text-${color}`}>{data}</div>
	</div>
</div>
