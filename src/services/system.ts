import { exec } from 'node:child_process';
import https from 'node:https';

export const openUrl = (target: string) => {
	let command;
	const platform = process.platform;

	if (platform === 'darwin') {
		command = `open "${target}"`;
	} else if (platform === 'win32') {
		command = `start "" "${target}"`;
	} else {
		command = `xdg-open "${target}"`;
	}

	exec(command, (error) => {
		if (error) {
			// Fail silently
		}
	});
};

export const checkForUpdate = async (pkg: { name: string; version: string }): Promise<string | null> => {
	return new Promise<string | null>((resolve) => {
		const req = https.get(
			`https://registry.npmjs.org/${pkg.name}/latest`,
			{
				timeout: 3000,
				headers: { 'User-Agent': `npx-${pkg.name}` },
			},
			(res) => {
				let data = '';
				res.on('data', (chunk) => (data += chunk));
				res.on('end', () => {
					try {
						const latest = JSON.parse(data).version;
						if (latest && latest !== pkg.version) {
							resolve(latest);
							return;
						}
					} catch (e) {
						// ignore
					}
					resolve(null);
				});
			},
		);

		req.on('error', () => resolve(null));
		req.on('timeout', () => {
			req.destroy();
			resolve(null);
		});
	});
};
