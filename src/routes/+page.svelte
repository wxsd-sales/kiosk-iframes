<script>
	import '../app.scss';
	import Card from '../components/card.svelte';
	import logo from '../assets/logo.jpeg';
	import applications from '../applications';
	import BoopAction from '../animation/BoopAction.svelte';
	import { browser } from '$app/environment';
	import QA from '../components/Q&A.svelte';
	import listItems from '../faq';
	import SensorData from '../components/SensorData.svelte';
	import innovation from '../assets/innovation.jpeg';
	import video from '../assets/GSA-SMALL.mp4';
	import image from '../assets/GSA.jpeg';
	import { page } from '$app/stores';
	import {setupConnection} from '../stores'
	import { onMount } from 'svelte';

	let URL = null;
	let frame;

	const onSelect = (url) => {
		URL = url;
		console.log(URL);
	};

	const token = $page.url.searchParams.get('token') || null;

	// Setup Websocket using token
	if(token != null) {
		setupConnection(token)
	}

	// Add the token to the end of the dashboard url
	applications.forEach((app, index)=>{
		if(!app.url.includes('dnaspaces')) return;
		applications[index].url = app.url+token;
	})



	const includeVideoBackground = $page.url.searchParams.get('includeVideoBackground') === 'yes';
</script>

<div class="app is-flex is-flex-direction-column">
	<div
		class="bg-image"
		style={`background: ${
			includeVideoBackground ? 'none' : `#fff url(${image}) center top/cover no-repeat;`
		}`}
	>
		{#if includeVideoBackground}
			<video class="video-background" autoplay loop muted playsinline>
				<source src={video} />
			</video>
		{/if}
	</div>
	<nav
		class="navbar is-flex is-align-items-center is-translucent-black pl-4 is-transparent pt-4 pb-2"
		role="navigation"
		style="margin-bottom: 1rem;"
		aria-label="main navigation"
	>
		<div class="navbar-brand">
			<figure
				class="image is-128x128 mr-4 logo"
				on:click={() => {
					URL = null;
				}}
			>
				<img src={logo} />
			</figure>
		</div>
		<div class="navbar-item is-flex is-flex-direction-column  is-align-items-start">
			<p class=" m-0 title is-4 has-text-white">General Services Administration</p>
			<p class=" mt-2  is-size-5 has-text-white">Workplace Innovation Lab</p>
		</div>

		<div id="navbarBasicExample" class="navbar-menu">
			<div class="navbar-start">
				<div class="navbar-item" />
			</div>

			<div class="navbar-end is-flex is-flex-direction-column">
				<div class="columns navbar-item p-0">
					<div class="column has-text-white p-1" style="width: 9rem">New York</div>
					<div class="column has-text-white p-1">75°</div>
				</div>
				<div class="columns navbar-item p-0">
					<div class="column has-text-white p-1">{new Date().toDateString()}</div>
				</div>
			</div>
		</div>
	</nav>
	<div class="contnet" style="width: 100%; height: 100%;">
		{#if URL === null}
			<div class="columns cards" style="padding: 5rem 4rem 2rem 4rem">
				{#each applications as { imgUrl, title, subtitle, avatarUrl, description, url }, i}
					<div class="column">
						<BoopAction boopParams={{ scale: 1.1, timing: 200 }}>
							<Card {imgUrl} {title} {subtitle} {avatarUrl} {description} {url} {onSelect} />
						</BoopAction>
					</div>
				{/each}
			</div>
		{:else if URL === 'NO-URL'}
			<div class="QA">
				<div
					class="has-background-grey-lighter close-button"
					on:click={() => {
						URL = null;
					}}
				>
					<span class="icon has-text-link-dark">
						<i class="mdi mdi-48px mdi-arrow-left-bold" />
					</span>
					<span class="is-size-5 has-text-weight-medium"> Return to Main Menu </span>
				</div>
				<div class="box is-translucent-black" style="border-radius: 0;">
					{#each listItems as { question, answer }, i}
						<QA {question} {answer} />
					{/each}
					<QA />
				</div>
			</div>
		{/if}
		{#if URL === null}
			<div class="customFooter">
				<div
					class="box is-flex is-translucent-black mb-0"
					style="height: 15rem; margin-left: 4rem;"
				>
					<figure class="image">
						<img src={innovation} style="width: 22rem; height: 12rem;" />
					</figure>
					<p
						class="has-text-white  is-size-5"
						style="width: 50rem; margin-left: 3rem; text-indent: 1rem; line-height: 2rem;"
					>
						<span class="subtitle has-text-weight-bold	 is-size-4 has-text-white"
							>The Workplace Innovation Lab
						</span> (WIL) is the pilot project of GSA’s federal coworking concept. Located at GSA headquarters
						in Washington, DC, the WIL is a proving ground for federal agencies to test out innovative
						environments in workplace furnishings and audio visual & technology solutions. The 25,000
						SF space is available for periods ranging from a single hour to weeks. Federal employees
						are able to reserve workspaces and collaborative areas online within six distinct neighborhoods.
					</p>
				</div>
				<div class="contact has-text-weight-medium has-text-light">
					<div class="box is-translucent-black mb-0" style="margin-left: 4rem;">
						<p class="subtitle has-text-white mb-4 is-flex is-justify-content-center">
							Room Metrics
						</p>
						<div class="columns">
							<div class="column">
								<SensorData title="Temperature" icon="thermometer" type='ambientTemp' color="danger" />
							</div>
							<div class="column">
								<SensorData title="Air Quality" icon="smoke" type='airQuality' color="danger" />
								<SensorData title="Humidity" icon="water-percent" type='relativeHumidity'  color="warning" />
							</div>
							<div class="column">
								<SensorData title="Noise" icon="waveform" type='ambientNoise' color="success" />
								<SensorData
									title="Occupancy"
									icon="account-group"
									type='peopleCount'
									color="success"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}

		{#each applications as { url }}
			{#if url !== 'NO-URL'}
				<div class="iframe" class:hide={url !== URL}>
					<div
						class="has-background-grey-lighter close-button"
						on:click={() => {
							URL = null;
							frame.src = url;
						}}
					>
						<span class="icon has-text-link-dark">
							<i class="mdi mdi-48px mdi-arrow-left-bold" />
						</span>
						<span class="is-size-5 has-text-weight-medium"> Return to Main Menu </span>
					</div>
					<iframe src={url} bind:this={frame} />
				</div>
			{/if}
		{/each}
	</div>
</div>

<style>
	.video-background {
		width: 100%;
		height: 100%;
		background-color: black;
	}
	.hide {
		display: none !important;
	}
	.logo {
		cursor: pointer;
		height: 90px;
	}

	.QA {
		display: flex;
		flex-direction: column;
		margin: 4rem 10rem;
		position: relative;
	}
	.iframe {
		z-index: 1;
		display: flex;
		position: relative;
		height: 80%;
		justify-content: center;
		align-items: center;
		opacity: 1;
		margin: 2rem 8rem;
		flex-direction: column;
	}

	.customFooter {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		z-index: 1;
		position: relative;
		background-color: transparent;
		bottom: 0;
	}

	.contact {
		display: flex;
		padding-right: 4rem;
		padding-bottom: 0;
	}

	.close-button {
		height: 3rem;
		width: 16rem;
		display: flex;
		justify-content: space-evenly;
		align-self: flex-start;
		align-items: center;
		cursor: pointer;
		margin-bottom: 0.5rem;
	}

	.textContainer {
		width: 30rem;
		height: 15rem;
		white-space: pre;
		margin-right: 0.25rem;
		margin-top: 0.5rem;
		border: none;
	}

	.app {
		display: flex;
		height: 100%;
	}

	.bg-image {
		position: absolute;
		display: block;
		height: 100%;
		width: 100%;
		z-index: 0;
		filter: brightness(50%);
	}

	.content {
		z-index: 1;
	}
</style>
