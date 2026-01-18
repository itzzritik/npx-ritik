import boxen from 'boxen';
import { select } from './input.js';
import figlet from 'figlet';
import chalk from 'chalk';
import { UserProfile } from '../core/types.js';
import { padCenter, startCase } from './components.js';
import { openUrl } from '../services/system.js';

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

enum Action {
	EMAIL = 'email',
	RESUME = 'resume',
	MEETING = 'meeting',
	EXIT = 'exit',
}

export const promptAction = (profile: UserProfile) => {
	const { messages: msgs, theme } = profile.config!;
	const [primary, secondary] = [theme!.primary, theme!.secondary].map((c) => (chalk as any)[c!] || chalk.whiteBright);

	const createChoice = (value: Action, search?: string) => {
		const item = (msgs as any)[value];
		const message = item?.message || '';
		const description = item?.description || '';

		return {
			name: search ? message.replace(search, primary(search)) : message,
			value,
			description: secondary('\n' + description),
		};
	};

	const actions = {
		[Action.EMAIL]: () => {
			openUrl(`mailto:${profile.personal.displayEmail}?subject=Hi%20${profile.personal.name.split(' ')?.[0]}!`);
			console.log(`\n\n${msgs!.email!.success}\n`);
		},
		[Action.RESUME]: () => {
			openUrl(profile.personal.resume || 'https://cv.ritik.me');
			console.log(`\n\n${msgs!.resume!.success}\n`);
		},
		[Action.MEETING]: () => {
			openUrl(profile.personal.meeting || 'https://meet.ritik.me');
			console.log(`\n\n${msgs!.meeting!.success}\n`);
		},
		[Action.EXIT]: () => console.log(`\n\n${msgs!.exit!.success}\n`),
	};

	select({
		message: 'Choose an Action',
		choices: [
			createChoice(Action.EMAIL, 'email'),
			createChoice(Action.RESUME, 'Resume'),
			createChoice(Action.MEETING, 'Meeting'),
			createChoice(Action.EXIT),
		],
	}).then((answer) => actions[answer]());
};
