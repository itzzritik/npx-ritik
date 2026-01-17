import packageJson from '../package.json';
import { DEFAULT_CLI_CONFIG } from './core/config.js';
import { UserProfile } from './core/types.js';
import { fetchProfile } from './services/api.js';
import { ensureLatest } from './services/updater.js';
import { Spinner } from './ui/components.js';
import { chalk } from './ui/theme.js';
import { drawCard, promptAction } from './ui/views.js';

const run = async () => {
	console.clear();
	if (ensureLatest(packageJson.name)) return;
	const spinner = new Spinner('Fetching profile data...').start();

	try {
		const profile: UserProfile = await fetchProfile();

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
		drawCard(profile);
		promptAction(profile);
	} catch (error) {
		spinner.fail('Failed to load profile');
		if (error instanceof Error) console.error(`\nError: ${error.message}`);
		else console.error('\nAn unknown error occurred.');
		process.exit(1);
	}
};

run();
