import boxen from 'boxen';
import { select } from '@inquirer/prompts';
import figlet from 'figlet';
import ansiShadow from 'figlet/importable-fonts/ANSI Shadow.js';
import { chalk } from './theme.js';
import { UserProfile } from '../core/types.js';
import { padCenter, startCase } from './components.js';
import { openUrl } from '../services/system.js';

figlet.parseFont('ANSI Shadow', ansiShadow);

export const drawCard = (profile: UserProfile) => {
	const { theme, ui } = profile.config!;
	const { name, website, displayEmail, currentRole, npx } = profile.personal;
	const fName = name.split(' ')?.[0];
	const site = website || `https://${displayEmail.replace(/.*@/, '')}`;
	const secondaryColor = (chalk as any)[theme!.secondary!] || chalk.whiteBright;
	const asciiName = figlet.textSync(name.toUpperCase().replace(' ', '\n'), { font: 'ANSI Shadow' });

	const bannerItems = [
		...profile.socialHandles.map((s) => ({
			label: startCase(s.platform),
			value: `${s.url}/${s.handle}`,
			color: s.color,
		})),
		{ label: ui!.title!, value: site, color: theme!.accent! },
		{ label: ui!.npx!, value: npx || `npx ${fName.toLowerCase()}`, color: '#cb3837' },
	];

	const maxLabelLen = Math.max(...bannerItems.map((i) => i.label.length));
	const maxValueLen = Math.max(...bannerItems.map((i) => i.value.length));

	const CardData = [
		null,
		...asciiName.split('\n').map((line) => chalk.bold.whiteBright(padCenter(line))),
		secondaryColor(padCenter(currentRole.toUpperCase())),
		null,
		...bannerItems.map((item) => {
			const label = item.label.padEnd(maxLabelLen, ' ');
			const value = item.value.padEnd(maxValueLen, ' ');
			return chalk.hex(item.color).bgWhiteBright.inverse(padCenter(`  ${label} :  ${value}  `));
		}),
		null,
		...(ui?.footer?.map((line) => chalk.italic(secondaryColor(padCenter(line)))) || []),
		null,
	];

	console.log(
		boxen(CardData.join('\n'), {
			margin: 1,
			float: 'center',
			textAlignment: 'center',
			borderStyle: theme!.borderStyle as any,
			borderColor: theme!.borderColor as any,
		}),
	);
	console.log(ui!.cmdTip!);
};

enum PromptAction {
	EMAIL = 'email',
	RESUME = 'resume',
	MEETING = 'meeting',
	EXIT = 'exit',
}

export const promptAction = (profile: UserProfile) => {
	const { messages, theme } = profile.config!;
	const primary = (chalk as any)[theme!.primary!] || chalk.cyanBright;
	const secondary = (chalk as any)[theme!.secondary!] || chalk.whiteBright;
	const msgs = messages!;

	type MsgKey = keyof typeof msgs;

	const createChoice = (key: MsgKey, value: PromptAction, search?: string) => {
		const item = msgs[key]!;
		return {
			name: search ? item.message!.replace(search, primary(search)) : item.message!,
			value,
			description: secondary('\n' + item.description),
		};
	};

	const actions = {
		[PromptAction.EMAIL]: () => {
			openUrl(`mailto:${profile.personal.displayEmail}?subject=Hi%20${profile.personal.name.split(' ')?.[0]}!`);
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
		[PromptAction.EXIT]: () => console.log(`\n\n${messages!.exit!.success}\n`),
	};

	select({
		message: 'Choose an Action',
		choices: [
			createChoice('email', PromptAction.EMAIL, 'email'),
			createChoice('resume', PromptAction.RESUME, 'Resume'),
			createChoice('meeting', PromptAction.MEETING, 'Meeting'),
			createChoice('exit', PromptAction.EXIT),
		],
	}).then((answer) => actions[answer]());
};
