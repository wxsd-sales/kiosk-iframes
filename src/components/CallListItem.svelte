<script lang='ts'>
	import { onDestroy, onMount } from 'svelte';
	import { getPersonDetails } from '../lib/webex';
	import { page } from '$app/stores';

	let person: string;
	let displayModal = false;
	let disabled = true;
	let name;

	const lobbyAmbassadorID = $page.url.searchParams.get('lobbyAmbassadorID');
	const deviceSIPAddress = $page.url.searchParams.get('deviceSIPAddress');

	const toggleModal = () => {
		displayModal = !displayModal;

		if (!displayModal) {
			messageIsSent = false;
		}
	};

	onMount(async () => {
		person = await getPersonDetails(lobbyAmbassadorID);
	});
</script>

<nav class="level has-text-white is-size-4">
	<div class="level-left">
		{#if person}
			<div class="level-item mr-5">
				<figure class="image is-64x64">
					<img class="is-rounded" src={person.avatar} alt="Avatar"/>
				</figure>
			</div>
		{/if}
		<div class="level-item">
			<p>I need to speak with someone</p>
		</div>
	</div>
	<div class="level-right">
		<div class="level-item">
			<button class="button is-success p-5" onclick={`location.href='sip:${deviceSIPAddress}'`}>
				<span class="icon ">
					<i class="mdi mdi-36px mdi-phone" />
				</span>
			</button>
		</div>
	</div>
</nav>