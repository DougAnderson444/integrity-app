<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	import { encodeURLSafe } from '@stablelib/base64';
	import Finger from '$lib/Finger.svelte';
	import Format from '$lib/Format.svelte';

	/**
	 * Default wrapper is the Format component
	 * @type {SvelteComponent}
	 */
	export let wrapper = Format;

	/**
	 * @type {string}
	 */
	let path;
	/**
	 * @type {string}
	 */
	let dataUrl;
	/**
	 * @type {HTMLAnchorElement}
	 */
	let el_link;

	/**
	 * @type {HTMLDivElement}
	 */
	let el_notification;

	/**
	 * @type {Uint8Array}
	 */
	let hash;
	let integrity;
	// Test whether it's isSafari
	let isSafari = false;

	onMount(async () => {
		const name = 'innerApp.js';
		// fetch the text
		const appRaw = await fetch(`${base}/${name}`).then((res) => res.text());

		// generate sha256 Subresource Integrity of app.js (appRaw)
		// and use it as integrity attribute of script tag
		// to prevent MITM attacks
		let algo = 'SHA-256';
		const hashBuffer = await crypto.subtle.digest(algo, new TextEncoder().encode(appRaw));
		hash = new Uint8Array(hashBuffer);

		integrity = algo.toLowerCase().replace('-', '') + `-${encodeURLSafe(hash)}`;

		path =
			window.location.origin +
			window.location.pathname.replace('index.html', '').replace(/\/$/, '');
		dataUrl =
			`data:text/html,<script src="${path}/${name}" integrity="${integrity}" crossorigin></scr` +
			`ipt><!-` +
			'-';

		el_link.href = dataUrl;

		// FIXME: This device detection is quite fragile
		// const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
		isSafari = navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');
		const isAndroid = navigator.userAgent.toLowerCase().indexOf('android') > -1;

		// if safari simply click the link
		if (isSafari) {
			el_link.textContent = 'Click to open app';
			return;
		}

		el_link.onclick = (e) => {
			e.preventDefault();
			navigator.clipboard.writeText(dataUrl);
			el_notification.hidden = false;
			setTimeout((_) => (el_notification.hidden = true), 5000);
		};

		if (isAndroid) {
			// if Android fallback to copy to clipboard
			el_link.textContent = 'Click to copy link';
			return;
		}

		// if Desktop fallback to drag and drop
		el_link.textContent = 'Drag me into tab bar';
	});
</script>

<svelte:component this={wrapper}>
	<svelte:fragment slot="finger">
		{#if !isSafari}
			<!-- Safari can just click the link -->
			<Finger />
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="link">
		<a id="el_link" bind:this={el_link} class="h-full w-full px-4 py-2 overflow-auto block"
			>Drag me into tab bar</a
		>
	</svelte:fragment>

	<svelte:fragment slot="notification">
		<div id="el_notification" bind:this={el_notification} hidden>
			✅ Data URL copied to clipboard. Paste it into your browser's address bar.
		</div>
	</svelte:fragment>
</svelte:component>
