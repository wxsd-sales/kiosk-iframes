<script lang="ts">
	import '../app.scss';
	import Card from '../components/card.svelte';
	import Metrics from '../components/Metrics.svelte';
	import applications from '../applications';
	import BoopAction from '../animation/BoopAction.svelte';
	import QA from '../components/Q&A.svelte';
	import listItems from '../faq';
	import innovation from '../assets/cardImages/innovation.jpeg';
	import { page } from '$app/stores';

	let URL: string | null = null;
	let frame = {};

	const onSelect = (url: string) => {
		URL = url;
		frame.src = url;
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
</script>

<svelte:head>
	{#each applications as { url, title }}
		<link rel="prefetch" href={url} as="document" />
	{/each}
</svelte:head>

{#if URL === null}
	<div class="tile is-ancestor px-5 pt-1 m-0">
		{#each applications as app, i}
			<div class="tile is-parent">
				<Card {...app} {onSelect} />
			</div>
		{/each}
	</div>

	<div class="tile is-ancestor px-5 m-0">
		<div class="tile is-parent ">
			<article class="tile is-child is-translucent-black box">
				<div class="columns is-flex is-vcentered">
					<div class="column is-4">
						<figure class="image ">
							<img alt="Innovation" src={innovation} />
						</figure>
					</div>
					<div class="column ">
						<p class="has-text-white flex-shrink">
							<span class="subtitle has-text-weight-bold	is-size-4 has-text-white"
								>The Workplace Innovation Lab
							</span>

							(WIL) is the pilot project of GSA’s federal coworking concept. Located at GSA
							headquarters in Washington, DC, the WIL is a proving ground for federal agencies to
							test out innovative environments in workplace furnishings and audio visual &
							technology solutions. The 25,000 SF space is available for periods ranging from a
							single hour to weeks. Federal employees are able to reserve workspaces and
							collaborative areas online within six distinct neighborhoods.
						</p>
					</div>
				</div>
			</article>
		</div>
		<div class="tile is-parent is-4">
			<article class="tile is-child is-translucent-black box">
				<Metrics title="Office Metrics" {token} />
			</article>
		</div>
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
{:else}
	<div class="iframe" scrolling="no">
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
		<iframe src={URL} scrolling="no" bind:this={frame} />
	</div>
{/if}

<!-- {#each applications as { url, title }}
	{#if url !== 'NO-URL'}
		<div class="iframe" scrolling="no" class:hide={url !== URL}>
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
			<iframe {title} src={url} scrolling="no" bind:this={frame} />
		</div>
	{/if}
{/each} -->
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
