import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import fs from 'fs';
import { encode } from '@stablelib/base64';

let index = fs.readFileSync('./wallet/dist/index.html', 'utf-8');
const template = fs.readFileSync('./wallet/template.js', 'utf-8');
// replace backticks and ${} with escaped versions
// index = index.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

// encode it using base64 in such a way that atob can decode it
index = encode(new TextEncoder().encode(index)).toString();
const wallet = template.replace('%%index%%', index);

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
