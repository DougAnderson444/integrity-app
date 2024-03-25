import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
	plugins: [viteSingleFile(), svelte()],
	build: {
		rollupOptions: {
			output: {
				inlineDynamicImports: false
			}
		}
	},
	server: {
		fs: {
			strict: false
		}
	},
	worker: {
		format: 'es'
	}
});
