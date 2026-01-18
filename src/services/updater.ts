import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ensureLatest = (pkgName: string) => {
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	const isLocal = fs.existsSync(path.join(__dirname, '../src'));
	const isRedirect = process.env.NPX_RITIK_REDIRECT === 'true';

	if (!isLocal && !isRedirect) {
		const child = spawn(`npx --yes ${pkgName}@latest`, {
			stdio: 'inherit',
			shell: true,
			env: { ...process.env, NPX_RITIK_REDIRECT: 'true' },
		});

		child.on('close', (code) => {
			process.exit(code || 0);
		});

		return true;
	}
	return false;
};
