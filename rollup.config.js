import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
	input: 'src/index.ts',
	plugins: [
		nodeResolve({
			preferBuiltins: true,
			exportConditions: ['node'],
		}),
		commonjs(),
		json(),
		esbuild({ minify: true, target: 'node20' }),
	],
	output: [
		{
			name: 'ritik',
			file: 'dist/index.js',
			format: 'es',
			banner: '#!/usr/bin/env node',
		},
	],
};
