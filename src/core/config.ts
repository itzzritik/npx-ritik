import { CLIConfig } from './types.js';

export const CONFIG = {
	profileUrl: 'https://raw.githubusercontent.com/itzzritik/itzzritik/refs/heads/main/profile/profile.json',
};

export const DEFAULT_CLI_CONFIG: CLIConfig = {
	theme: {
		primary: 'cyanBright',
		secondary: 'whiteBright',
		accent: '#f1c40f',
		borderStyle: 'single',
		borderColor: 'cyan',
	},
	ui: {
		title: 'Portfolio',
		npx: 'Npx',
		cmdTip: 'Tip: Try cmd/ctrl + click on the links above',
		footer: [
			'I am actively seeking new opportunities and welcome any inquiries',
			'Please feel free to contact me for questions or casual greetings',
			'I will make every effort to respond promptly',
			'My inbox remains open for your correspondence.',
		],
	},
	messages: {
		email: {
			message: 'Send me an email?',
			description: 'Send a message — I promise low-latency replies.',
			success: 'Email launched — preparing witty yet professional response.',
		},
		resume: {
			message: 'Checkout my Resume?',
			description: 'Pulling the latest version of my resume from production.',
			success: 'Thanks for reading — hope my resume speaks your language.',
		},
		meeting: {
			message: 'Schedule a Meeting?',
			description: 'Scheduling a sync — adding coffee to the calendar... ☕',
			success: 'Meeting scheduled — time to build something great together.',
		},
		exit: {
			message: 'Exit.',
			description: 'Ending session, but not the connection.',
			success: 'Session ended — but DMs are always open.',
		},
	},
};
