export interface SocialHandle {
	color: string;
	handle: string;
	platform: "facebook" | "twitter" | "linkedin" | "github" | "instagram" | "website" | "email" | "npx" | "x";
	url: string;
}

export interface CLIConfig {
	messages?: {
		email?: { message?: string; description?: string; success?: string };
		resume?: { message?: string; description?: string; success?: string };
		meeting?: { message?: string; description?: string; success?: string };
		exit?: { message?: string; description?: string; success?: string };
	};
	theme?: {
		primary?: string;
		secondary?: string;
		accent?: string;
		borderStyle?: "single" | "double" | "round" | "bold" | "singleDouble" | "doubleSingle" | "classic";
		borderColor?: string;
	};
	ui?: {
		title?: string;
		npx?: string;
		cmdTip?: string;
		footer?: string[];
	};
}

export interface UserProfile {
	config?: CLIConfig;
	personal: {
		name: string;
		currentRole: string;
		displayEmail: string;
		website: string;
		npx?: string;
		resume?: string;
		meeting?: string;
	};
	socialHandles: SocialHandle[];
}
