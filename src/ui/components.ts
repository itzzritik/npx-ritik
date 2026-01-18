import { chalk } from './theme.js';

const leftPad = 22;
const rightPad = 80;
const totalPad = leftPad + rightPad + 2;

export const padCenter = (string: string, char = ' ') => {
	return string.padStart(string.length + Math.floor((totalPad - string.length) / 2), char).padEnd(totalPad, char);
};

export const startCase = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export class Spinner {
	private frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
	private interval: NodeJS.Timeout | null = null;
	private current = 0;
	private text: string;

	constructor(text: string) {
		this.text = text;
	}

	start() {
		process.stdout.write('\x1B[?25l');
		this.interval = setInterval(() => {
			process.stdout.write(`\r${chalk.cyanBright(this.frames[this.current])} ${this.text}`);
			this.current = (this.current + 1) % this.frames.length;
		}, 80);
		return this;
	}

	stop() {
		if (this.interval) {
			clearInterval(this.interval);
			this.interval = null;
			process.stdout.write('\r\x1B[K');
			process.stdout.write('\x1B[?25h');
		}
		return this;
	}

	succeed(text?: string) {
		this.stop();
		console.log(`${chalk.hex('#00FF00')('✔')} ${text || this.text}`);
		return this;
	}

	fail(text?: string) {
		this.stop();
		console.log(`${chalk.hex('#FF0000')('✖')} ${text || this.text}`);
		return this;
	}
}
