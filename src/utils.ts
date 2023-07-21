import chalk from 'chalk';

const leftPad = 22;
const rightPad = 52;
const totalPad = leftPad + rightPad + 2;

const bannerColor = {
    facebook: chalk.hex("#3b5998"),
    twitter: chalk.hex("#1DA1F2"),
    linkedin: chalk.hex("#0077B5"),
    github: chalk.hex("#666666"),
    instagram: chalk.hex("#fb3958"),
    website: chalk.hex("#f1c40f"),
    email: chalk.hex("#f39c12"),
    npx: chalk.hex("#cb3837"),
};

export const getBanner = (type: string, label: string, value: string) => {
    return bannerColor[type]?.dim?.bgWhite?.inverse(`${label.padStart(leftPad, ' ')}:  ${value.padEnd(rightPad, ' ')}`)
}

export const startCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const padCenter = (string, char = ' ') => {
    return string.padStart(string.length + Math.floor((totalPad - string.length) / 2), char).padEnd(totalPad, char)
}
