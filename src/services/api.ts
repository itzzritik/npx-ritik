import { UserProfile } from '../core/types.js';
import { CONFIG } from '../core/config.js';

export const fetchProfile = async (): Promise<UserProfile> => {
	const res = await fetch(CONFIG.profileUrl);
	if (!res.ok) throw new Error(`Failed to fetch profile: ${res.statusText}`);
	return res.json() as Promise<UserProfile>;
};
