import { select } from '@inquirer/prompts';
import chalk from 'chalk';
import open from 'open';

enum PromptAction {
    EMAIL = 'email',
    RESUME = 'resume',
    MEETING = 'meeting',
    EXIT = 'exit'
}

const choices = [
	{
		name: `Send me an ${chalk.green.bold('email')}?`,
		value: PromptAction.EMAIL,
		description: chalk.white.dim.bold('\nI will get back to you as soon as possible.'),
	},
	{
		name: `Checkout my ${chalk.magentaBright.bold('Resume')}?`,
		value: PromptAction.RESUME,
		description: chalk.white.dim.bold('\nI am actively seeking new opportunities and welcome any inquiries.'),
	},
	{
		name: `Schedule a ${chalk.redBright.bold('Meeting')}?`,
		value: PromptAction.MEETING,
		description: chalk.white.dim.bold('\nI will make every effort to respond promptly.'),
	},
	{
		name: 'Exit.',
		value: PromptAction.EXIT,
		description: chalk.white.dim.bold('\nHasta la vista.'),
	},
];

export default function Prompt (profile) {
	const actions = {
		[PromptAction.EMAIL]: () => {
			open(`mailto:${profile?.personal?.displayEmail}?subject=Hi%20${profile?.personal?.name?.split?.(' ')?.[0]}!`);
			console.log('\nDone, Catch you in your inbox soon!\n');
		},
		[PromptAction.RESUME]: () => {
			open('https://go.ritik.me/resume');
			console.log('\nYour interest is greatly appreciated!\n');
		},
		[PromptAction.MEETING]: () => {
			open('https://calendly.com/itzzritik/hello');
			console.log('\nLooking forward to our meeting! See you there.\n');
		},
		[PromptAction.EXIT]: () => {
			console.log('Hasta la vista.\n');
		},
	};

	select({
		message: 'Choose an Action',
		choices,
	}).then((answer) => actions[answer]());
}
