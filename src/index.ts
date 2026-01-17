import ora from 'ora';

import DrawCard from './DrawCard.js';
import Prompt from './Prompt.js';
import { UserProfile } from './types.js';

const run = async () => {
	console.clear();
	const spinner = ora('Fetching profile data...').start();

	try {
		const response = await fetch('https://raw.githubusercontent.com/itzzritik/ItzzRitik/main/profile/profile.json');
		if (!response.ok) {
			throw new Error(`Failed to fetch profile: ${response.statusText}`);
		}
		const profile: UserProfile = await response.json();
		spinner.succeed('Profile loaded successfully');

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
