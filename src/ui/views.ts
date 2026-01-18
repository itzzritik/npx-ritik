import boxen from 'boxen';
import { select } from '@inquirer/prompts';
import figlet from 'figlet';
import ansiShadow from 'figlet/importable-fonts/ANSI Shadow.js';
import { chalk } from './theme.js';
import { UserProfile } from '../core/types.js';
import { getBanner, padCenter, startCase } from './components.js';
import { openUrl } from '../services/system.js';

figlet.parseFont('ANSI Shadow', ansiShadow);

export const drawCard = (profile: UserProfile) => {
	const { theme, ui } = profile.config!;
	const fName = profile.personal.name.split(' ')?.[0];
	const website = profile.personal.website || `https://${profile.personal.displayEmail.replace(/.*@/, '')}`;
	const secondaryColor = (chalk as any)[theme!.secondary!] || chalk.whiteBright;
	const asciiName = figlet.textSync(profile.personal.name.toUpperCase().replace(' ', '\n'), { font: 'ANSI Shadow' });

	const CardData = [
		null,
		...asciiName.split('\n').map((line) => chalk.bold.whiteBright(padCenter(line))),
		secondaryColor(padCenter(profile.personal.currentRole.toUpperCase())),
		null,
	];

	type BannerItem = { label: string; value: string; color: string };
	const bannerItems: BannerItem[] = [];

	profile.socialHandles.forEach((social) => {
		bannerItems.push({
			label: startCase(social.platform),
			value: `${social.url}/${social.handle}`,
			color: social.color,
		});
	});
	bannerItems.push({ label: ui!.title!, value: website, color: theme!.accent! });
	bannerItems.push({ label: ui!.npx!, value: profile.personal.npx || `npx ${fName.toLowerCase()}`, color: '#cb3837' });

	const maxLabelLen = Math.max(...bannerItems.map((item) => item.label.length));
	const maxValueLen = Math.max(...bannerItems.map((item) => item.value.length));

	// Total width matching the original specific dimensions (22 + 80 + 2) from components.ts
	// We want the background to span this full width.
	const totalWidth = 104;

	bannerItems.forEach((item) => {
		const label = item.label.padEnd(maxLabelLen, ' ');
		const value = item.value.padEnd(maxValueLen, ' ');

		// Create the content block
		const content = `  ${label} :  ${value}  `;

		// Center the content within the total width
		const remainingSpace = Math.max(0, totalWidth - content.length);
		const leftPad = Math.floor(remainingSpace / 2);
		const rightPad = remainingSpace - leftPad;

		const color = chalk.hex(item.color);
		CardData.push(color.bgWhiteBright.inverse(''.padStart(leftPad, ' ') + content + ''.padEnd(rightPad, ' ')));
	});

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
		textAlignment: 'center',
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
