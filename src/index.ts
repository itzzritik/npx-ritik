import chalk from "chalk";
import packageJson from "../package.json";
import { DEFAULT_CLI_CONFIG } from "./core/config.js";
import { fetchProfile } from "./services/api.js";
import { ensureLatest } from "./services/updater.js";
import { Spinner } from "./ui/components.js";
import { drawCard, promptAction } from "./ui/views.js";

const run = async () => {
	console.clear();
	if (ensureLatest(packageJson.name)) return;
	const spinner = new Spinner("Fetching data...").start();

	try {
		const profile = await fetchProfile();

		profile.config = {
			messages: {
				email: { ...DEFAULT_CLI_CONFIG.messages?.email, ...profile.config?.messages?.email },
				exit: { ...DEFAULT_CLI_CONFIG.messages?.exit, ...profile.config?.messages?.exit },
				meeting: { ...DEFAULT_CLI_CONFIG.messages?.meeting, ...profile.config?.messages?.meeting },
				resume: { ...DEFAULT_CLI_CONFIG.messages?.resume, ...profile.config?.messages?.resume },
			},
			theme: { ...DEFAULT_CLI_CONFIG.theme, ...profile.config?.theme },
			ui: { ...DEFAULT_CLI_CONFIG.ui, ...profile.config?.ui },
		};

		spinner.succeed(`Welcome to ${profile.personal.name.split(" ")?.[0]}'s Cli Portfolio ${chalk.dim(`- v${packageJson.version}`)}`);
		drawCard(profile);
		promptAction(profile);
	} catch (error) {
		spinner.fail("Failed to load profile");
		if (error instanceof Error) console.error(`\nError: ${error.message}`);
		else console.error("\nAn unknown error occurred.");
		process.exit(1);
	}
};

run();
