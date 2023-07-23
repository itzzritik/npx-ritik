import { select } from '@inquirer/prompts';
import chalk from 'chalk';
import open from 'open';

enum PromptAction {
    EMAIL = 'email',
    RESUME = 'resume',
    MEETING = 'meeting',
    QUIT = 'quit'
}

const choices = [
	{
		name: `Send me an ${chalk.green.bold('email')}?`,
		value: PromptAction.EMAIL,
	},
	{
		name: `Checkout my ${chalk.magentaBright.bold('Resume')}?`,
		value: PromptAction.RESUME,
	},
	{
		name: `Schedule a ${chalk.redBright.bold('Meeting')}?`,
		value: PromptAction.MEETING,
	},
	{
		name: 'Exit.',
		value: PromptAction.QUIT,
	},
];

export default function Prompt (profile) {
	const actions = {
		[PromptAction.EMAIL]: () => {
			open(`mailto:${profile?.personal?.displayEmail}?subject=Hi%20${profile?.personal?.displayName.split(' ')[0]}!`);
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
		[PromptAction.QUIT]: () => {
			console.log('Hasta la vista.\n');
		},
	};

	select({
		message: 'Choose an Action',
		choices,
	}).then((answer) => actions[answer]());
}
