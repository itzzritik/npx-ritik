import readline from 'node:readline';
import process from 'node:process';
import chalk from 'chalk';

export function select<T>(config: { message: string; choices: { name: string; value: T; description?: string }[] }): Promise<T> {
	const { stdin, stdout } = process;
	const rl = readline.createInterface({ input: stdin, output: stdout });
	const { choices, message } = config;
	let idx = 0;

	if (stdin.isTTY) stdin.setRawMode(true);
	readline.emitKeypressEvents(stdin);
	stdout.write('\x1B[?25l');

	const render = (first = false) => {
		if (!first) {
			const lines = 1 + choices.length + 1;
			readline.moveCursor(stdout, 0, -lines);
			readline.cursorTo(stdout, 0);
			readline.clearScreenDown(stdout);
		}

		const sel = choices[idx];
		const list = choices.map((c, i) => (i === idx ? `${chalk.cyan('❯')} ${chalk.cyan(c.name)}` : `  ${c.name}`)).join('\n');
		stdout.write(`${chalk.green('?')} ${chalk.bold(message)}\n${list}\n${sel.description || ''}`);
	};

	render(true);

	return new Promise((resolve) => {
		const done = () => {
			stdout.write('\x1B[?25h');
			if (stdin.isTTY) stdin.setRawMode(false);
			stdin.removeListener('keypress', handle);
			rl.close();
		};

		const handle = (_: unknown, k: readline.Key) => {
			if (k.name === 'return') {
				const sel = choices[idx];
				const lines = 1 + choices.length + 1;
				readline.moveCursor(stdout, 0, -lines);
				readline.cursorTo(stdout, 0);
				readline.clearScreenDown(stdout);
				stdout.write(`${chalk.green('✔')} ${chalk.bold(message)} ${chalk.gray('·')} ${sel.name}\n`);
				done();
				resolve(sel.value);
			} else if (k.ctrl && k.name === 'c') {
				done();
				process.exit(0);
			} else if (k.name === 'up') {
				idx = (idx - 1 + choices.length) % choices.length;
				render();
			} else if (k.name === 'down') {
				idx = (idx + 1) % choices.length;
				render();
			}
		};

		stdin.on('keypress', handle);
	});
}
