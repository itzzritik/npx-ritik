const ESC = '\x1b[';
const RESET = `${ESC}0m`;

const hexToRgb = (hex: string) => {
	const bigint = parseInt(hex.replace('#', ''), 16);
	return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

const ansi = {
	bold: (s: string) => `${ESC}1m${s}${RESET}`,
	dim: (s: string) => `${ESC}2m${s}${RESET}`,
	italic: (s: string) => `${ESC}3m${s}${RESET}`,
	inverse: (s: string) => `${ESC}7m${s}${RESET}`,
	bgWhite: (s: string) => `${ESC}47m${s}${RESET}`,
	cyanBright: (s: string) => `${ESC}96m${s}${RESET}`,
	whiteBright: (s: string) => `${ESC}97m${s}${RESET}`,
	hex: (hex: string) => {
		const [r, g, b] = hexToRgb(hex);
		return (s: string) => `${ESC}38;2;${r};${g};${b}m${s}${RESET}`;
	},
};

const createChainer = (baseStyle: (s: string) => string = (s) => s) => {
	const proxy: any = (s: string) => baseStyle(s);
	const styles = ['dim', 'bold', 'italic', 'inverse', 'bgWhite', 'cyanBright', 'whiteBright'];
	styles.forEach((style) => {
		Object.defineProperty(proxy, style, {
			get: () => {
				const nextStyle = (s: string) => baseStyle((ansi as any)[style](s));
				return createChainer(nextStyle);
			},
		});
	});
	return proxy;
};

export const chalk = {
	...ansi,
	hex: (hex: string) => {
		const base = ansi.hex(hex);
		return createChainer(base);
	},
	bold: createChainer(ansi.bold),
	dim: createChainer(ansi.dim),
	italic: createChainer(ansi.italic),
	cyanBright: ansi.cyanBright,
	whiteBright: ansi.whiteBright,
} as any;
