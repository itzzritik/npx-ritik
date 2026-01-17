import boxen from 'boxen';
import chalk from 'chalk';

import { UserProfile } from './types.js';
import { getBanner, padCenter, startCase } from './utils.js';

const tip = [`Tip: Try ${chalk.cyanBright.bold('cmd/ctrl + click')} on the links above`, null].join('\n');

const footer = [
	'I am actively seeking new opportunities and welcome any inquiries',
	'Please feel free to contact me for questions or casual greetings',
	'I will make every effort to respond promptly',
	'My inbox remains open for your correspondence.',
];
export default function DrawCard(profile: UserProfile) {
	const fName = profile.personal.name.split(' ')?.[0];
	const website = `https://${profile.personal.displayEmail.replace(/.*@/, '')}`;
	const CardData = [
		null,
		chalk.bold.cyanBright(padCenter(profile.personal.name)),
		chalk.whiteBright(padCenter(profile.personal.currentRole)),
		null,
	];
	const safeColors: Record<string, string> = {
		github: '#666666',
		x: '#1DA1F2',
	};

	profile.socialHandles.forEach((social) => {
		const color = safeColors[social.platform] || social.color;
		CardData.push(getBanner(startCase(social.platform), `${social.url}/${social.handle}`, color));
	});
	CardData.push(getBanner('Portfolio', website, '#f1c40f'));
	CardData.push(getBanner('Npx', `npx ${fName.toLowerCase()}`, '#cb3837'));
	CardData.push(null);
	footer.forEach((line) => {
		CardData.push(chalk.italic.whiteBright(padCenter(line)));
	});
	CardData.push(null);

	const Card = boxen(CardData.join('\n'), {
		margin: 1,
		float: 'center',
		borderStyle: 'single',
		borderColor: 'cyan',
	});

	console.log(Card);
	console.log(tip);
}
