import { UserProfile } from '../core/types.js';
import { CONFIG } from '../core/config.js';

export const fetchProfile = async (): Promise<UserProfile> => {
	const res = await fetch(CONFIG.profileUrl);
	if (!res.ok) throw new Error(`Failed to fetch profile: ${res.statusText}`);
	const profile = (await res.json()) as UserProfile;

	const overrides: Record<string, string> = {
		github: '#666666',
		x: '#1DA1F2',
	};

	profile.socialHandles = profile.socialHandles.map((social) => ({
		...social,
		color: overrides[social.platform] || social.color,
	}));

	return profile;
};
