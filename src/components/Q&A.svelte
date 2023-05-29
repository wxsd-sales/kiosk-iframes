<script lang='ts'>
	import CallListItem from './CallListItem.svelte';
	import Modal from './Modal.svelte';
	export let question: string | null = null;
	export let answer: string | null = null;
	
	let showAnswer = false;
	const toggleModal = () => {
		showAnswer = !showAnswer;
	};
</script>

<div class="box is-translucent-black">
	{#if question == null}
		<CallListItem />
	{:else if !showAnswer}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="question has-text-white is-size-4" on:click={toggleModal} style="cursor: pointer;">
			{question}
		</div>
	{:else}
		<Modal {toggleModal} modalHeader={question}>
			<p class="mb-4">
				{@html answer}
			</p>
		</Modal>
	{/if}
</div>