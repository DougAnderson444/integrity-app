<script>
	import { onMount } from 'svelte';
	import { WurboLoader } from 'wurbo';

	onMount(() => {
		// TODO: Hardcode the app wasm default?
		// TODO: window.opener API for signing and data exchange (backup, export, etc.)
	});
</script>

<main>
	<WurboLoader inline={true} />
</main>
