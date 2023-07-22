import esbuild from "rollup-plugin-esbuild";
import { createRequire } from 'module';

const pkg = createRequire(import.meta.url)('./package.json');
export default {
	input: "src/index.ts",
	plugins: [
		esbuild({ minify: false }),
	],
	output: [
		{
			name: "ritik",
			file: "dist/index.js",
			format: "cjs",
		},
	],
	external: [...Object.keys(pkg.dependencies)],
};
