import path from 'path';
import { createHash } from 'crypto';
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import fs from 'fs';

// Poached from import sri from '@small-tech/vite-plugin-sri'; // which doesn't work with my code
export function hashOutputFiles(base) {
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

			const process = (index, el) => {
				const element = $(el);
				const src = element.attr('src') || element.attr('href');
				const filePath = path.join(outputDir, src);
				const content = fs.readFileSync(filePath, 'utf8');

				// insert ${base} before `assets/` in the source code content
				// so that the innerApp can load the correct urls
				const newContent = content.replace(/"\/assets\//g, `"${base}/assets/`);
				// write the modified content back to the file
				fs.writeFileSync(filePath, newContent);

				const algo = 'sha384';
				const integrity = createHash(algo).update(newContent).digest().toString('base64');
				element.attr('integrity', `${algo}-${integrity}`);
			};

			scripts.each(process);
			stylesheets.each(process);

			fs.writeFileSync(outputFilePath, $.html());
		}
	};
}
