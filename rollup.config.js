import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
	input: 'src/index.ts',
	external: (id) => /^(node:|figlet)/.test(id),
	plugins: [
		nodeResolve({ preferBuiltins: false, exportConditions: ['node', 'import'] }),
		commonjs(),
		json(),
		esbuild({ minify: true, target: 'node20' }),
	],
	output: { file: 'dist/index.js', format: 'es', banner: '#!/usr/bin/env node' },
};
