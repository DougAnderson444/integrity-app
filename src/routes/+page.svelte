<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import htmlRaw from '../../wallet/dist/index.html?raw';

	import { encodeURLSafe, decodeURLSafe } from '@stablelib/base64';

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

	onMount(async () => {
		// fetch the binary so we can use btoa to convert to base64
		const appRaw = await fetch(`${base}/wallet.js`).then((res) => res.text());

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
			`data:text/html,<script src="${path}/wallet.js" integrity="${integrity}" crossorigin></scr` +
			`ipt><!-` +
			'-';

		el_link.href = dataUrl;

		// FIXME: This device detection is quite fragile
		const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
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

<h1>Welcome to Secure Bookmark Warp Wallet</h1>
<a id="el_link" bind:this={el_link} class="installer">Drag me into tab bar</a>

<div id="el_notification" bind:this={el_notification} hidden>
	Data URL copied to clipboard. Paste it into your browser's address bar.
</div>
<br />
<!-- {hash)} -->
