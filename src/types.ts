export interface SocialHandle {
	platform: 'facebook' | 'twitter' | 'linkedin' | 'github' | 'instagram' | 'website' | 'email' | 'npx';
	url: string;
	handle: string;
}

export interface UserProfile {
	personal: {
		name: string;
		currentRole: string;
		displayEmail: string;
	};
	socialHandles: SocialHandle[];
}
