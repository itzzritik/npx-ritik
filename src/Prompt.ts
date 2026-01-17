import { select } from '@inquirer/prompts';
import chalk from 'chalk';
import open from 'open';

import { UserProfile } from './types.js';

enum PromptAction {
	EMAIL = 'email',
	RESUME = 'resume',
	MEETING = 'meeting',
	EXIT = 'exit',
}

export default function Prompt(profile: UserProfile) {
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
			open(`mailto:${profile.personal.displayEmail}?subject=Hi%20${firstName}!`);
			console.log(`\n\n${messages!.email!.success}\n`);
		},
		[PromptAction.RESUME]: () => {
			open(profile.personal.resume || 'https://cv.ritik.me');
			console.log(`\n\n${messages!.resume!.success}\n`);
		},
		[PromptAction.MEETING]: () => {
			open(profile.personal.meeting || 'https://meet.ritik.me');
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
}
