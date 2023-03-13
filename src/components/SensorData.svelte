<script lang='ts'>
	import { telemetry } from '../stores.js';
	import getColor from '$lib/telemetry-color';
	import demoData from '../demoData';
	export let title :string;
	export let icon :string;
	export let demo :boolean;
	export let type: 'ambientTemp'| 'airQuality' | 'relativeHumidity' | 'ambientNoise' 

	let color = 'white';
	let data = '...';

	telemetry.subscribe((event: any) => {
		if (demo){
			data = demoData.sensors[type];
			return;
		} else if (typeof event.level === 'undefined') {
			data = '...';
		} else {
			data = event[type];
		}
		
		switch (type) {
			case 'ambientTemp':
				color = getColor.getTempColor(data);
				break;
			case 'relativeHumidity':
				color = getColor.getHumidityColor(data);
				break;
			case 'ambientNoise':
				color = getColor.getAmbientNoiseColor(data);
				break;
			case 'airQuality':
				color = getColor.getAirQuality(data);
				break;
		}
	});
</script>

<p class="has-text-weight-medium has-text-grey-lighter has-text-centered mb-1">{title}</p>

<div class="is-flex is-flex-direction-row is-justify-content-center">
	<span class="icon is-medium has-text-link">
		<i class={`mdi mdi-${icon} mdi-24px`} />
	</span>
	<div class={`is-size-5 is-justify-content-flex-end has-text-${color}`}>{data}</div>
</div>