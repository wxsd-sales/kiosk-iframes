<script>
	import '/src/app.scss';
	// @ts-ignore
	import { page } from '$app/stores';
	import Metrics from '/src/components/Metrics.svelte';

	const token = $page.url.searchParams.get('token');
</script>

<div class="contact">
	<div class="box is-translucent-black">
		<Metrics title="GSA WIL 2nd Floor" {token} />
	</div>
</div>
