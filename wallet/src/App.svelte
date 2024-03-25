<script>
	import { onMount, tick } from 'svelte';
	import workerFile from './worker?raw';

	onMount(async () => {
		const blobBase64 = btoa(workerFile);
		const worker = new Worker(new URL(`data:application/javascript;base64,${blobBase64}`), {
			type: 'module'
		});
	});
</script>
