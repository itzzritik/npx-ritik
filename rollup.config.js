import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import esbuild from "rollup-plugin-esbuild";

const EXTERNAL_PATTERN = /^(?:node:|figlet)/u;

export default {
	external: (id) => EXTERNAL_PATTERN.test(id),
	input: "src/index.ts",
	output: { banner: "#!/usr/bin/env node", file: "dist/index.js", format: "es" },
	plugins: [nodeResolve({ exportConditions: ["node", "import"], preferBuiltins: false }), commonjs(), json(), esbuild({ minify: true, target: "node20" })],
};
