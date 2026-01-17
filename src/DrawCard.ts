import boxen from 'boxen';
import chalk from 'chalk';

import { UserProfile } from './types.js';
import { getBanner, padCenter, startCase } from './utils.js';

export default function DrawCard(profile: UserProfile) {
	const { theme, ui } = profile.config!;
	const fName = profile.personal.name.split(' ')?.[0];
	const website = profile.personal.website || `https://${profile.personal.displayEmail.replace(/.*@/, '')}`;

	const primaryColor = (chalk as any)[theme!.primary!] || chalk.cyanBright;
	const secondaryColor = (chalk as any)[theme!.secondary!] || chalk.whiteBright;

	const CardData = [
		null,
		chalk.bold(primaryColor(padCenter(profile.personal.name))),
		secondaryColor(padCenter(profile.personal.currentRole)),
		null,
	];

	profile.socialHandles.forEach((social) => {
		const color = social.color;
		CardData.push(getBanner(startCase(social.platform), `${social.url}/${social.handle}`, color));
	});
	CardData.push(getBanner(ui!.title!, website, theme!.accent!));
	CardData.push(getBanner(ui!.npx!, profile.personal.npx || `npx ${fName.toLowerCase()}`, '#cb3837'));
	CardData.push(null);

	if (ui?.footer) {
		ui.footer.forEach((line) => {
			CardData.push(chalk.italic(secondaryColor(padCenter(line))));
		});
	}
	CardData.push(null);

	const Card = boxen(CardData.join('\n'), {
		margin: 1,
		float: 'center',
		borderStyle: theme!.borderStyle as any,
		borderColor: theme!.borderColor as any,
	});

	console.log(Card);
	console.log(ui!.cmdTip!);
}
