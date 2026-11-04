import { exec } from "node:child_process";

export const openUrl = (target: string) => {
	let command: string;
	const { platform } = process;

	if (platform === "darwin") {
		command = `open "${target}"`;
	} else if (platform === "win32") {
		command = `start "" "${target}"`;
	} else {
		command = `xdg-open "${target}"`;
	}

	exec(command, (error) => {
		if (error) {
			// Ignore url opening failures silently
		}
	});
};
