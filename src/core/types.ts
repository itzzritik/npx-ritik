export interface SocialHandle {
	platform: 'facebook' | 'twitter' | 'linkedin' | 'github' | 'instagram' | 'website' | 'email' | 'npx' | 'x';
	url: string;
	handle: string;
	color: string;
}

export interface CLIConfig {
	theme?: {
		primary?: string;
		secondary?: string;
		accent?: string;
		borderStyle?: 'single' | 'double' | 'round' | 'bold' | 'singleDouble' | 'doubleSingle' | 'classic';
		borderColor?: string;
	};
	ui?: {
		title?: string;
		npx?: string;
		cmdTip?: string;
		footer?: string[];
	};
	messages?: {
		email?: { message?: string; description?: string; success?: string };
		resume?: { message?: string; description?: string; success?: string };
		meeting?: { message?: string; description?: string; success?: string };
		exit?: { message?: string; description?: string; success?: string };
	};
}

export interface UserProfile {
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
	config?: CLIConfig;
}
