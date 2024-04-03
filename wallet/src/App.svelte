<script>
	import { onMount, tick } from 'svelte';
	import workerFile from './worker.js?raw';
	import { Loader } from './lib/index.js';

	onMount(async () => {});
</script>

<svelte:head>
	<script src="https://cdn.tailwindcss.com"></script>
</svelte:head>

<Loader />
