import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { CONFIG } from "../core/config.js";
import type { UserProfile } from "../core/types.js";

const getCachePath = () => {
	const baseDir = process.env.XDG_CACHE_HOME || path.join(os.homedir(), ".cache");
	return path.join(baseDir, "npx-ritik", "profile.json");
};

const readCachedProfile = (): UserProfile | null => {
	try {
		const cachePath = getCachePath();
		if (fs.existsSync(cachePath)) {
			const data = fs.readFileSync(cachePath, "utf-8");
			const parsed = JSON.parse(data) as UserProfile;
			parsed.isCached = true;
			return parsed;
		}
	} catch {
		// Ignore cache read failures
	}
	return null;
};

const writeCachedProfile = (profile: UserProfile): void => {
	try {
		const cachePath = getCachePath();
		fs.mkdirSync(path.dirname(cachePath), { recursive: true });
		fs.writeFileSync(cachePath, JSON.stringify(profile), "utf-8");
	} catch {
		// Ignore cache write failures silently
	}
};

const applyOverrides = (profile: UserProfile): UserProfile => {
	const overrides: Record<string, string> = {
		github: "#666666",
		x: "#1DA1F2",
	};

	profile.socialHandles = profile.socialHandles.map((social) => ({
		...social,
		color: overrides[social.platform] || social.color,
	}));

	return profile;
};

export const fetchProfile = async (): Promise<UserProfile> => {
	try {
		const res = await fetch(CONFIG.profileUrl, { signal: AbortSignal.timeout(4000) });
		if (!res.ok) throw new Error(`Failed to fetch profile: ${res.statusText}`);
		const rawProfile = (await res.json()) as UserProfile;
		const profile = applyOverrides(rawProfile);
		writeCachedProfile(profile);
		return profile;
	} catch (error) {
		const cached = readCachedProfile();
		if (cached) return cached;
		throw error;
	}
};
