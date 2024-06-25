# Integrity Apps

_Always know the code hasn't changed._

By getting the browser to check the [subresource integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) at the app layer, we can ensure the code is what you expect. 

## Use

The first step is to build your inner app into a single HTML file (index.html) with SRI JavaScript and CSS file(s), this repo includes [a demo of this](./inner-app/) for reference which is built into the [dist](./dist/) folder. 

Then, you need to build the outer app, which will load the inner app as long as the SRI hashes match. This functionality is built into, and exported as [Integrity.svelte](./src/lib/Integrity.svelte).

Once your project is built and hosted, anyone going to the URL will get a data URL to drag or copy into the browser's address bar. This will load the outer app, which will check the integrity of the inner app before loading it.

Then, users just bookmark the data URL and bring that up any time they want to use the site. If they want to upgrade, they just need to refresh the original website and update their bookmarks.

## Developing

Structure:

- [./inner-app/src/App.svelte](./inner-app/src/App.svelte) The inner app that is built and hashed.
- [./src/lib/Integrity.svelte](./src/lib/Integrity.svelte) The outer app that checks the hash and loads the inner app.
- [./src/routes/+page.svelte](./src/routes/+page.svelte) Demo use of composing the Components together.

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), build the [./inner-app](./inner-app/) and start a development server using [just](https://just.systems/man/en/):

```bash
just dev
```

## Building

To create a production version of your app:

```bash
just build
```

You can preview the production build with `npm run preview` or `just preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Manual Subresource Integrity

To manually [generate the SRI](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity#tools_for_generating_sri_hashes) for a file, use openssl:

```bash
cat static/innerApp.js | openssl dgst -sha256 -binary | openssl base64 -A
```

To check the integrity of the app, you can use the `sri` command:

```bash
just sri
```

## References

Original concept by Robin Linus [Secure Bookmark](https://github.com/coins/secure-bookmark).
