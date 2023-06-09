<script lang="ts">
	import '../app.scss';
	import Card from '../components/card.svelte';
	import Metrics from '../components/Metrics.svelte';
	import applications from '../applications';
	import QA from '../components/Q&A.svelte';
	import { connect } from '../stores';
	import listItems from '../faq';
	import innovation from '../assets/cardImages/innovation.jpeg';
	import { page } from '$app/stores';
	import { PUBLIC_WIFI_PASSWORD } from '$env/static/public';

	const showPassword = PUBLIC_WIFI_PASSWORD != undefined;

	let socket: WebSocket | undefined;
	let selection: number | null = null;

	const onSelect = (option: number) => {
		selection = option;
	};

	const back = () => {
		selection = null;
	};

	const token = $page.url.searchParams.get('token');
	const xapikey = $page.url.searchParams.get('x-api-key');
	const building = $page.url.searchParams.get('building');
	const level = $page.url.searchParams.get('level');

	if (xapikey) {
		let params = new URLSearchParams();
		if (building) {
			params.append('building', building);
		}
		if (level) {
			params.append('level', level);
		}
		params.append('x-api-key', xapikey);
		const newURl = 'https://gsa.placeos.run/map-kiosk/#/explore?' + params.toString();
		applications.forEach((app, index) => {
			if (app.tag != 'PlaceOS') return;
			applications[index].url = newURl;
		});
	}

	if (token) {
		applications.forEach((app, index) => {
			if (app.tag != 'DNASpaces') return;
			applications[index].url = 'https://workspaces.dnaspaces.io/?token=' + token;
		});
	}

	if (token != null) {
		socket = connect(token);
	}
</script>

<svelte:head>
	{#each applications as { url }}
		{#if url != 'NO-URL'}
			<link rel="prefetch" href={url} as="document" />
		{/if}
	{/each}
</svelte:head>



{#if selection === null}
	<div class="tile is-ancestor px-5 pt-1 m-0">
		{#each applications as {imgUrl, title, subtitle, avatarUrl, description}, ref}
			<div class="tile is-parent">
				<Card {imgUrl} {title} {subtitle} {avatarUrl} {description} {ref} {onSelect} />
			</div>
		{/each}
	</div>

	<div class="tile is-ancestor px-5 m-0">
		<div class="tile is-parent is-vertical">
			<article class="tile is-child is-translucent-black box">
				<div class="columns is-vcentered">
					<div class="column is-4">
						<figure class="image">
							<img alt="Innovation" src={innovation} />
						</figure>
					</div>
					<div class="column is-flex is-align-content-center">
						<p class="has-text-white is-size-5">
							<span class="subtitle has-text-weight-bold is-size-4 has-text-white"
								>The Workplace Innovation Lab
							</span>
							(WIL) is the pilot project of GSA’s federal coworking concept. Located at GSA headquarters
							in Washington, DC, the WIL is a proving ground for federal agencies to test out innovative
							environments in workplace furnishings and audio visual & technology solutions. The 25,000
							SF space is available for periods ranging from a single hour to weeks. Federal employees
							are able to reserve workspaces and collaborative areas online within six distinct neighborhoods.
						</p>
					</div>
				</div>
			</article>
			<article
				class="tile is-child is-translucent-black is-flex is-flex-direction-row is-justify-content-flex-start box"
			>
				{#if showPassword}
					<span class="icon has-text-link-dark is-medium">
						<i class="mdi mdi-36px mdi-wifi" />
					</span>
					<span class="has-text-weight-bold pl-4 is-size-4 has-text-white">
						This Month's WIL_WIFI Password:
					</span>
					<span class=" has-text-weight-bold pl-5 is-size-4 has-text-white">
						{PUBLIC_WIFI_PASSWORD}
					</span>
				{/if}
			</article>
		</div>
		<div class="tile is-parent is-5">
			<article
				class="tile is-child is-flex is-flex-direction-column is-justify-content-space-around is-translucent-black box"
			>
				<Metrics {socket} />
			</article>
		</div>
	</div>
{:else if applications[selection].url == undefined}
	<div class="QA">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="has-background-grey-lighter close-button"
			on:click={back}
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

{#each applications as { url, title }, i}
	{#if url }
		<div class="iframe" class:hide={i !== selection}>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class="has-background-grey-lighter close-button"
				on:click={back}
			>
				<span class="icon has-text-link-dark">
					<i class="mdi mdi-48px mdi-arrow-left-bold" />
				</span>
				<span class="is-size-5 has-text-weight-medium"> Return to Main Menu </span>
			</div>
			{#if url.includes('youtube')}
				<iframe {title} src={i == selection ? url : ''} scrolling="no" />
			{:else}
				<iframe {title} src={url} scrolling="no" />
			{/if}
		</div>
	{/if}
{/each}

<style>
	.hide {
		display: none !important;
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
</style>
