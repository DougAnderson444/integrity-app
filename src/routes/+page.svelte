<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	import { encodeURLSafe } from '@stablelib/base64';
	import Finger from '$lib/Finger.svelte';

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

		console.log(appRaw);

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

<main class="flex flex-col px-8 py-2 w-screen">
	<h1 class="text-2xl font-semibold my-4">Welcome to Integrity Apps, a Secure Bookmark Webpage</h1>
	{#if !isSafari}
		<!-- Safari can just click the link -->
		<Finger />
	{/if}
	<a id="el_link" bind:this={el_link} class="border-2 rounded-lg shadow-md px-4 py-2 w-full"
		>Drag me into tab bar</a
	>

	<div id="el_notification" bind:this={el_notification} hidden class="">
		✅ Data URL copied to clipboard. Paste it into your browser's address bar.
	</div>

	<h2 class="text-xl font-semibold my-4">How does this work?</h2>
	<p class="my-2">
		When you copy/paste or drag the link into the address bar, the app will be loaded. This is a
		secure way to load the app because the app code cannot change behind your back. Once the data
		URL has loaded, you can bookmark it and use it in the future.
	</p>
</main>
