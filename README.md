# Integrity Apps

_Always know the code hasn't changed._

Uses [subresource integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) at the app layer to ensure the code is what you expect. 

## Developing

Structure:

- [./inner-app/src/App.svelte](./wallet/src/App.svelte) The inner app that is built and hashed.
- [./src/routes/+page.svelte](./src/routes/+page.svelte) The outer app that loads the inner app only if the hash matches.

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), build the [./inner-app](./inner-app/) and start a development server using [just](https://just.systems/man/en/):

```bash
just dev
```

## Building

To create a production version of your app:

```bash
just build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Manual Subresource Integrity

To manually [generate the SRI](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity#tools_for_generating_sri_hashes) for a file, use openssl:

```bash
cat wallet.js | openssl dgst -sha256 -binary | openssl base64 -A
```

To check the integrity of the app, you can use the `sri` command:

```bash

