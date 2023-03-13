<script>
	import { page } from '$app/stores';
	import { monitorWeather, weather, city, temperature } from '../stores';
	import { onMount } from 'svelte';

	import whiteLogo from '/src/assets/logos/logo-white.png';
	import blueLogo from '/src/assets/logos/logo-blue.png';

	let logo = whiteLogo;
    let date = new Date().toDateString();

	const logoColor = $page.url.searchParams.get('logoColor');
	const weatherToken = $page.url.searchParams.get('weatherToken');
	const cityId = $page.url.searchParams.get('cityId');

	onMount(async () => {
		if (cityId != null && weatherToken != null) {
			monitorWeather(cityId, weatherToken, 'imperial', 30);
		}

		setInterval(() => (date = new Date().toDateString()), 10000);

        if (logoColor == 'blue') {
		logo = blueLogo;
	}
	});

</script>

<nav class="level is-translucent-black" aria-label="main navigation">
	<div class="level-left">
		<div class="level-item p-4">
			<figure class="image is-96x96">
				<img alt="Company Logo" src={logo} />
			</figure>
		</div>
		<div class="level-item is-flex-direction-column is-align-items-start">
			<p class=" m-0 title has-text-white">General Services Administration</p>
			<p class=" pt-2  has-text-white">Workplace Innovation Lab</p>
		</div>
	</div>
	<div class="level-right pr-6">
		<div class="level-item is-flex-direction-column is-align-items-start">
			<div class="has-text-white">{$city}</div>
			<div class="has-text-white">{$temperature}°F</div>
			<div class="has-text-white">{$weather}</div>
			<div class="has-text-white">{date}</div>
		</div>
	</div>
</nav>