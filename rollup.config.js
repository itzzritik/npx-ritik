import { createRequire } from 'module';

import esbuild from 'rollup-plugin-esbuild';

const { dependencies } = createRequire(import.meta.url)('./package.json');
export default {
	input: 'src/index.ts',
	plugins: [
		esbuild({ minify: true }),
	],
	output: [
		{
			name: 'ritik',
			file: 'dist/index.js',
			format: 'es',
			banner: '#!/usr/bin/env node',
		},
	],
	external: [...Object.keys(dependencies)],
};
