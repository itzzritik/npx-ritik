import updateNotifier from 'update-notifier';
import ora from 'ora';
import chalk from 'chalk';

import packageJson from '../package.json';
import { CONFIG, DEFAULT_CLI_CONFIG } from './config.js';
import DrawCard from './DrawCard.js';
import Prompt from './Prompt.js';
import { UserProfile } from './types.js';

const run = async () => {
	console.clear();
	updateNotifier({ pkg: packageJson }).notify();
	const spinner = ora('Fetching profile data...').start();

	try {
		const response = await fetch(CONFIG.profileUrl);
		if (!response.ok) {
			throw new Error(`Failed to fetch profile: ${response.statusText}`);
		}
		const profile: UserProfile = await response.json();

		profile.config = {
			theme: { ...DEFAULT_CLI_CONFIG.theme, ...profile.config?.theme },
			ui: { ...DEFAULT_CLI_CONFIG.ui, ...profile.config?.ui },
			messages: {
				email: { ...DEFAULT_CLI_CONFIG.messages?.email, ...profile.config?.messages?.email },
				resume: { ...DEFAULT_CLI_CONFIG.messages?.resume, ...profile.config?.messages?.resume },
				meeting: { ...DEFAULT_CLI_CONFIG.messages?.meeting, ...profile.config?.messages?.meeting },
				exit: { ...DEFAULT_CLI_CONFIG.messages?.exit, ...profile.config?.messages?.exit },
			},
		};

		spinner.succeed(`Profile loaded (${chalk.dim(`v${packageJson.version}`)})`);

		DrawCard(profile);
		Prompt(profile);
	} catch (error) {
		spinner.fail('Failed to load profile');
		if (error instanceof Error) {
			console.error(`\nError: ${error.message}`);
		} else {
			console.error('\nAn unknown error occurred.');
		}
		process.exit(1);
	}
};

run();
