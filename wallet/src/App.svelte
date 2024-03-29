<script>
	import { onMount, tick } from 'svelte';
	import workerFile from './worker.js?raw';

	onMount(async () => {
		const worker = new Worker(new URL(`data:application/javascript,${encodeURIComponent(workerFile)}`));
			type: 'module'
		});
	});
</script>
