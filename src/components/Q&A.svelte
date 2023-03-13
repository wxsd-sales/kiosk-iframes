<script lang='ts'>
	import CallListItem from './CallListItem.svelte';
	import Modal from './Modal.svelte';
	export let question: string;
	export let answer: string;
	
	let showAnswer = false;
	const toggleModal = () => {
		showAnswer = !showAnswer;
	};
</script>

<div class="box is-translucent-black">
	{#if !question}
		<CallListItem />
	{:else if !showAnswer}
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