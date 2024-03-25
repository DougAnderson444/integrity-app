# Integrity Apps

_Always know the code hasn't changed._

Bundles an entire app into a single file, so that it can be hashed and [subresource integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) can be applied to it. 

## Developing

Structure:

- [./wallet/src/App.svelte](./wallet/src/App.svelte) The inner app that is built.
- [./src/routes/+page.svelte](./src/routes/+page.svelte) The outer app that loads the inner app.

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), build the [./wallet](./wallet/) and start a development server using [just](https://just.systems/man/en/):

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
