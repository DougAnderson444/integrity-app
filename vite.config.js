import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import fs from 'fs';

const index = fs.readFileSync('./wallet/dist/index.html', 'utf-8');
const template = fs.readFileSync('./wallet/template.js', 'utf-8');
const encoded = btoa(index);
const wallet = template.replace('%%index%%', index.replace(/`/g, '\\`').replace(/\$/g, '\\$'));

fs.writeFileSync('static/wallet.js', wallet);

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		fs: {
			strict: false
		}
	}
});
