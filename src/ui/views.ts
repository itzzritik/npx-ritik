import boxen from 'boxen';
import { select } from '@inquirer/prompts';
import { chalk } from './theme.js';
import { UserProfile } from '../core/types.js';
import { getBanner, padCenter, startCase } from './components.js';
import { openUrl } from '../services/system.js';

export const drawCard = (profile: UserProfile) => {
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
};

enum PromptAction {
	EMAIL = 'email',
	RESUME = 'resume',
	MEETING = 'meeting',
	EXIT = 'exit',
}

export const promptAction = (profile: UserProfile) => {
	const firstName = profile.personal.name.split(' ')?.[0];
	const { messages, theme } = profile.config!;

	const primaryColor = (chalk as any)[theme!.primary!] || chalk.cyanBright;
	const secondaryColor = (chalk as any)[theme!.secondary!] || chalk.whiteBright;

	const choices = [
		{
			name: messages!.email!.message!.replace('email', primaryColor('email')),
			value: PromptAction.EMAIL,
			description: secondaryColor('\n' + messages!.email!.description),
		},
		{
			name: messages!.resume!.message!.replace('Resume', primaryColor('Resume')),
			value: PromptAction.RESUME,
			description: secondaryColor('\n' + messages!.resume!.description),
		},
		{
			name: messages!.meeting!.message!.replace('Meeting', primaryColor('Meeting')),
			value: PromptAction.MEETING,
			description: secondaryColor('\n' + messages!.meeting!.description),
		},
		{
			name: messages!.exit!.message!,
			value: PromptAction.EXIT,
			description: secondaryColor('\n' + messages!.exit!.description),
		},
	];

	const actions = {
		[PromptAction.EMAIL]: () => {
			openUrl(`mailto:${profile.personal.displayEmail}?subject=Hi%20${firstName}!`);
			console.log(`\n\n${messages!.email!.success}\n`);
		},
		[PromptAction.RESUME]: () => {
			openUrl(profile.personal.resume || 'https://cv.ritik.me');
			console.log(`\n\n${messages!.resume!.success}\n`);
		},
		[PromptAction.MEETING]: () => {
			openUrl(profile.personal.meeting || 'https://meet.ritik.me');
			console.log(`\n\n${messages!.meeting!.success}\n`);
		},
		[PromptAction.EXIT]: () => {
			console.log(`\n\n${messages!.exit!.success}\n`);
		},
	};

	select({
		message: 'Choose an Action',
		choices,
	}).then((answer) => actions[answer]());
};
