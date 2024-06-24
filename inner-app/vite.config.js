import { defineConfig, loadEnv } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { createHash } from 'crypto';
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { devConfig } from '../config.js';
import { hashOutputFiles } from '../src/lib/index.js';

const devBase = devConfig.devBase;
let base;
const env = loadEnv('', process.cwd(), '');

export default defineConfig(({ command, mode }) => {
	if (command == 'serve') {
		base = devBase;
	} else {
		base = env.VITE_BASE || devBase;
	}

	return {
		plugins: [hashOutputFiles(base), svelte()],
		build: {
			minify: false
		},
		server: {
			origin: base,
			fs: {
				strict: false
			}
		},
		worker: {
			format: 'es'
		}
	};
});
