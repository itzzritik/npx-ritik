import chalk from 'chalk';

const leftPad = 22;
const rightPad = 52;
const totalPad = leftPad + rightPad + 2;

export const getBanner = (label: string, value: string, hexColor: string) => {
	const color = chalk.hex(hexColor);
	return color.dim.bgWhite.inverse(`${label.padStart(leftPad, ' ')}:  ${value.padEnd(rightPad, ' ')}`);
};

export const startCase = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export const padCenter = (string: string, char = ' ') => {
	return string.padStart(string.length + Math.floor((totalPad - string.length) / 2), char).padEnd(totalPad, char);
};
