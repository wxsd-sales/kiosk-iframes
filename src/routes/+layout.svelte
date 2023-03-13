<script lang="ts">
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import Header from '../components/Header.svelte';
	import video from '../assets/background/GSA-Video.mp4';
	import image from '../assets/background/GSA.jpeg';
	export let data: LayoutData;
	const includeVideoBackground = $page.url.searchParams.get('includeVideoBackground') === 'yes';
</script>

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

<Header />
<slot />

<style>
	.video-background {
		position: fixed;
		right: 0;
		bottom: 0;
		min-width: 100%;
		min-height: 100%;
		background-color: black;
	}

	.bg-image {
		position: absolute;
		display: block;
		min-width: 100%;
		min-height: 100%;
		z-index: -1;
		filter: brightness(50%);
		background-size: cover;
	}
</style>
