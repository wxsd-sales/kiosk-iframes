<script lang='ts'>
	export let toggleModal: any;
	export let modalHeader: string;
</script>

<div class="modal is-active">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="modal-background " on:click={toggleModal} />
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title has-text-danger is-size-2">
				<strong class="has-text-danger">{modalHeader}</strong></p>
			<button class="delete" aria-label="close" on:click={toggleModal} />
		</header>
		<section class="modal-card-body ">
			<p class="subtitle is-size-3">
				<slot />
			</p>
		</section>
	</div>
</div>