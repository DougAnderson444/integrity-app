import { defineConfig, loadEnv } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
// import sri from '@small-tech/vite-plugin-sri';
import { createHash } from 'crypto';
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { devConfig } from '../config.js';

const devBase = devConfig.devBase;
let base;
const env = loadEnv('', process.cwd(), '');

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	if (command == 'serve') {
		base = devBase;
	} else {
		base = env.VITE_BASE || devBase;
	}

	return {
		plugins: [readOutputFiles(), svelte()],
		build: {
			minify: false
		},
		server: {
			origin: base,
			fs: {
				strict: false
			}
		}
	};
});

const calculateIntegrityHashes = async (element) => {
	let source;
	let attributeName = element.attribs.src ? 'src' : 'href';
	const resourcePath = element.attribs[attributeName];

	if (resourcePath.startsWith('http')) {
		// Load remote source from URL.
		source = await (await fetch(resourcePath)).buffer();
	} else {
		// Load local source from bundle.
		const resourcePathWithoutLeadingSlash = element.attribs[attributeName].slice(1);
		const bundleItem = bundle[resourcePathWithoutLeadingSlash];
		source = bundleItem.code || bundleItem.source;
		// ensure there is no trailing new line (\n) in source
		source = source.replace(/\n$/, '');
	}
	const algo = 'sha384';
	const integrity = createHash(algo).update(source).digest().toString('base64');
	element.attribs.integrity = `${algo}-${integrity}`;
};

function sri() {
	return {
		name: 'vite-plugin-sri',
		enforce: 'post',
		apply: 'build',

		async transformIndexHtml(html, context) {
			const bundle = context.bundle;

			const $ = cheerio.load(html);
			$.prototype.asyncForEach = async function (callback) {
				for (let index = 0; index < this.length; index++) {
					await callback(this[index], index, this);
				}
			};

			// Implement SRI for scripts and stylesheets.
			const scripts = $('script').filter('[src]');
			const stylesheets = $('link[rel=stylesheet]').filter('[href]');

			await scripts.asyncForEach(calculateIntegrityHashes);
			await stylesheets.asyncForEach(calculateIntegrityHashes);

			return $.html();
		}
	};
}

function readOutputFiles() {
	return {
		name: 'read-output-files', // this name will show up in warnings and errors
		writeBundle(options) {
			// for the given dist/index.html, add integrity attributes to the script and link tags
			const outputDir = options.dir || path.dirname(options.file) || 'dist';
			const outputFilePath = path.join(outputDir, 'index.html');
			const outputHtml = fs.readFileSync(outputFilePath, 'utf8');
			const $ = cheerio.load(outputHtml);
			const scripts = $('script').filter('[src]');
			const stylesheets = $('link[rel=stylesheet]').filter('[href]');

			scripts.each((index, element) => {
				const scriptElement = $(element);
				const scriptSrc = scriptElement.attr('src');
				const scriptPath = path.join(outputDir, scriptSrc);
				let scriptContent = fs.readFileSync(scriptPath, 'utf8');

				// find matches for /assets/ in the scriptContent
				let matches = scriptContent.match(/"\/assets\//g);

				// insert ${base} before `assets/` in the source code scriptContent
				// so that the innerApp can load the correct urls
				scriptContent = scriptContent.replace(/"\/assets\//g, `"${base}/assets/`);
				// write the modified scriptContent back to the file
				fs.writeFileSync(scriptPath, scriptContent);

				const algo = 'sha384';
				const integrity = createHash(algo).update(scriptContent).digest().toString('base64');
				scriptElement.attr('integrity', `${algo}-${integrity}`);
			});

			stylesheets.each((index, element) => {
				const linkElement = $(element);
				const linkHref = linkElement.attr('href');
				const linkPath = path.join(outputDir, linkHref);
				let linkContent = fs.readFileSync(linkPath, 'utf8');

				// insert ${base} before `assets/` in the source code linkContent
				// so that the innerApp can load the correct urls
				linkContent = linkContent.replace(/"\/assets\//g, `"${base}/assets/`);
				// write the modified linkContent back to the file
				fs.writeFileSync(linkPath, linkContent);

				const algo = 'sha384';
				const integrity = createHash(algo).update(linkContent).digest().toString('base64');
				linkElement.attr('integrity', `${algo}-${integrity}`);
			});

			fs.writeFileSync(outputFilePath, $.html());
		}
	};
}
