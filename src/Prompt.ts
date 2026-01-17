import { select } from '@inquirer/prompts';
import chalk from 'chalk';
import open from 'open';

enum PromptAction {
	EMAIL = 'email',
	RESUME = 'resume',
	MEETING = 'meeting',
	EXIT = 'exit',
}

const choices = [
	{
		name: `Send me an ${chalk.green.bold('email')}?`,
		value: PromptAction.EMAIL,
		description: chalk.white.dim.bold('\nSend a message — I promise low-latency replies.'),
	},
	{
		name: `Checkout my ${chalk.magentaBright.bold('Resume')}?`,
		value: PromptAction.RESUME,
		description: chalk.white.dim.bold('\nPulling the latest version of my resume from production.'),
	},
	{
		name: `Schedule a ${chalk.redBright.bold('Meeting')}?`,
		value: PromptAction.MEETING,
		description: chalk.white.dim.bold('\nScheduling a sync — adding coffee to the calendar... ☕'),
	},
	{
		name: 'Exit.',
		value: PromptAction.EXIT,
		description: chalk.white.dim.bold('\nEnding session, but not the connection.'),
	},
];

export default function Prompt(profile) {
	const actions = {
		[PromptAction.EMAIL]: () => {
			open(`mailto:${profile?.personal?.displayEmail}?subject=Hi%20${profile?.personal?.name?.split?.(' ')?.[0]}!`);
			console.log('\n\nEmail launched — preparing witty yet professional response.\n');
		},
		[PromptAction.RESUME]: () => {
			open('https://cv.ritik.me');
			console.log('\n\nThanks for reading — hope my resume speaks your language.\n');
		},
		[PromptAction.MEETING]: () => {
			open('https://meet.ritik.me');
			console.log('\n\nMeeting scheduled — time to build something great together.\n');
		},
		[PromptAction.EXIT]: () => {
			console.log('\n\nSession ended — but DMs are always open.\n');
		},
	};

	select({
		message: 'Choose an Action',
		choices,
	}).then((answer) => actions[answer]());
}
