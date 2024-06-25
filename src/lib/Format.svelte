<div class="">
	<slot />
</div>
<main class="flex flex-col px-8 py-2 w-screen">
	<h1 class="text-2xl font-semibold mt-4">
		Welcome to Integrity Apps, a Secure Bookmark WebAssembly Loader
	</h1>
	<slot name="finger" />
	<div class="border-2 border-neutral-400 rounded-lg shadow-md outline-lime-50 w-fit">
		<slot name="link" />
	</div>
	<slot name="notification" />

	<details class="my-4">
		<summary class="my-4 cursor-pointer">FAQs</summary>

		<h2>Why do we need this?</h2>
		<p>
			We need an app architecture that is secure by default, which means the code <span
				class="highlighter">cannot change behind your back</span
			>, especially when it comes to sensitive data with secrets and personal information. Even the
			most cutting edge cryptography organizations are using Browser extensions or Mobile Apps to
			hold these secrets, both of which can change code without you knowing. But the
			<a
				href="https://github.com/coins/secure-bookmark?tab=readme-ov-file#traditional-solutions-do-not-work"
				target="_blank">traditional solutions do not work</a
			> and this a more secure alternative.
		</p>

		<h2>How does this work?</h2>
		<p>
			When you copy/paste or drag the link into the address bar, the app will be loaded. This is a
			secure way to load the app because the app code cannot change behind your back. Once the data
			URL has loaded, you can bookmark it and use it in the future.
		</p>

		<h2>Why is this secure?</h2>
		<p>
			This is secure because the browser will check the integrity of the app code before loading it.
			This means you (or a nerdy friend) can review the app code once, then know that it hasn't
			changed after that. This is important so that "updates" aren't applied without your knowledge
			or active consent!
		</p>

		<h2>What if I want to update?</h2>
		<p>
			If you want to update the app, you can simply revisit this page and copy/paste or drag the
			link into the address bar again. This will load the new version of the app. If there have been
			updates since you last book marked, you'll get a new integrity hash for the new code.
		</p>

		<h2>Can I run this page myself?</h2>
		<p>
			Yes! Everything is public and open source. You can run this page yourself by forking the <a
				href="https://github.com/DougAnderson444/integrity-app"
				target="_blank">code repository</a
			> with one click. GitHub will even host your Intergrity App for you if you like, for free.
		</p>

		<h2>What is the app?</h2>
		<p>
			The Integrity App uses a <a href="https://github.com/DougAnderson444/wurbo" target="_blank"
				>Wurbo</a
			> Loader by default, which means you can safely load any WebAsembly App that implements the Wurbo
			interfaces. Wurbo is a cutting edge Wasm framework that uses a minimal amount of JavaScript to
			make the WebAssembly Component interactive, but not enough to make it dangerous. It's just enough
			JavaScript to run the WebAssembly Component, nothing else!
		</p>

		<h2>What is the Wurbo Loader?</h2>
		<p>
			The Wurbo Loader is a WebAssembly Loader that uses a minimal amount of JavaScript to make the
			WebAssembly Component interactive, but not enough to make it dangerous. It's just enough
			JavaScript to run the WebAssembly Component, nothing else!
		</p>
	</details>
</main>

<style>
	h2 {
		@apply text-xl font-semibold mt-8 mb-2;
	}

	p {
		@apply leading-normal;
	}

	.highlighter {
		@apply border-b-2 border-lime-500;
	}

	a {
		@apply border border-neutral-400/50 rounded-lg shadow-md outline-lime-50 px-2 py-1 w-full bg-sky-200/50;
	}

	a:not(#el_link)::after {
		content: '➚';
		margin-left: 0.5rem;
	}
</style>
