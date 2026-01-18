import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { builtinModules } from 'node:module';

export default {
	input: 'src/index.ts',
	external: (id) => id.startsWith('node:') || builtinModules.includes(id) || id === 'figlet' || id.startsWith('figlet/'),
	plugins: [
		commonjs({ include: /node_modules/ }),
		nodeResolve({
			preferBuiltins: false,
			exportConditions: ['node', 'import', 'default'],
			browser: false,
			mainFields: ['module', 'main'],
		}),
		json(),
		esbuild({
			minify: true,
			target: 'node20',
			treeShaking: true,
			minifyIdentifiers: true,
			minifySyntax: true,
			minifyWhitespace: true,
			legalComments: 'none',
		}),
	],
	output: {
		file: 'dist/index.js',
		format: 'es',
		banner: '#!/usr/bin/env node',
		compact: true,
		generatedCode: { constBindings: true },
	},
	treeshake: {
		moduleSideEffects: false,
		propertyReadSideEffects: false,
		unknownGlobalSideEffects: false,
	},
};
