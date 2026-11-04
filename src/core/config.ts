import type { CLIConfig } from "./types.js";

export const CONFIG = {
	profileUrl: "https://raw.githubusercontent.com/itzzritik/itzzritik/refs/heads/main/profile/profile.json",
};

export const DEFAULT_CLI_CONFIG: CLIConfig = {
	messages: {
		email: {
			description: "Send a message — I promise low-latency replies.",
			message: "Send me an Email",
			success: "Email launched — preparing witty yet professional response.",
		},
		exit: {
			description: "Ending session, but not the connection.",
			message: "Exit",
			success: "Session ended — but DMs are always open.",
		},
		meeting: {
			description: "Scheduling a sync — adding coffee to the calendar... ☕",
			message: "Schedule a Meeting",
			success: "Meeting scheduled — time to build something great together.",
		},
		resume: {
			description: "Pulling the latest version of my resume from production.",
			message: "Checkout my Resume",
			success: "Thanks for reading — hope my resume speaks your language.",
		},
	},
	theme: {
		accent: "#f1c40f",
		borderColor: "cyan",
		borderStyle: "single",
		primary: "cyanBright",
		secondary: "whiteBright",
	},
	ui: {
		cmdTip: "Tip: Try cmd/ctrl + click on the links above",
		footer: [
			"Open to meaningful conversations and interesting opportunities",
			"Feel free to reach out for questions, collaborations, or a quick hello",
			"I do my best to respond in a timely manner",
		],
		npx: "Cli Portfolio",
		title: "Portfolio",
	},
};
