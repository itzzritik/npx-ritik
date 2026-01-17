export interface SocialHandle {
	platform: 'facebook' | 'twitter' | 'linkedin' | 'github' | 'instagram' | 'website' | 'email' | 'npx' | 'x';
	url: string;
	handle: string;
	color: string;
}

export interface UserProfile {
	personal: {
		name: string;
		currentRole: string;
		displayEmail: string;
	};
	socialHandles: SocialHandle[];
}
