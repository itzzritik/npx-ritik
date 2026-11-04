import boxen from "boxen";
import chalk from "chalk";
import figlet from "figlet";
import ansiShadowFont from "figlet/importable-fonts/ANSI Shadow.js";
import type { UserProfile } from "../core/types.js";
import { openUrl } from "../services/system.js";
import { padCenter, startCase } from "./components.js";
import { select } from "./input.js";

figlet.parseFont("ANSI Shadow", ansiShadowFont);

const EMAIL_DOMAIN_PATTERN = /.*@/u;

export const drawCard = (profile: UserProfile) => {
	const { theme, ui } = profile.config!;
	const { name, website, displayEmail, currentRole, npx } = profile.personal;
	const fName = name.split(" ")?.[0];
	const site = website || `https://${displayEmail.replace(EMAIL_DOMAIN_PATTERN, "")}`;
	const secondaryColor = (chalk as any)[theme!.secondary!] || chalk.whiteBright;
	const asciiName = figlet.textSync(name.toUpperCase().replace(" ", "\n"), { font: "ANSI Shadow" });

	const bannerItems = [
		...profile.socialHandles.map((s) => ({
			color: s.color,
			label: startCase(s.platform),
			value: `${s.url}/${s.handle}`,
		})),
		{ color: theme!.accent!, label: ui!.title!, value: site },
		{ color: "#cb3837", label: ui!.npx!, value: npx || `npx ${fName.toLowerCase()}` },
	];

	const maxLabelLen = Math.max(...bannerItems.map((i) => i.label.length));
	const maxValueLen = Math.max(...bannerItems.map((i) => i.value.length));

	const CardData = [
		null,
		...asciiName.split("\n").map((line) => chalk.bold.whiteBright(padCenter(line))),
		secondaryColor(padCenter(currentRole.toUpperCase())),
		null,
		...bannerItems.map((item) => {
			const label = item.label.padEnd(maxLabelLen, " ");
			const value = item.value.padEnd(maxValueLen, " ");
			return chalk.bgHex(item.color).whiteBright.bold(padCenter(`  ${label} :  ${value}  `));
		}),
		null,
		...(ui?.footer?.map((line) => chalk.italic(secondaryColor(padCenter(line)))) || []),
		null,
	];

	console.log(
		boxen(CardData.join("\n"), {
			borderColor: theme!.borderColor as any,
			borderStyle: theme!.borderStyle as any,
			float: "center",
			margin: 1,
			textAlignment: "center",
		})
	);
	console.log(ui!.cmdTip!);
};

const Action = {
	EMAIL: "email",
	EXIT: "exit",
	MEETING: "meeting",
	RESUME: "resume",
} as const;

type Action = (typeof Action)[keyof typeof Action];

export const promptAction = (profile: UserProfile) => {
	const { messages: msgs, theme } = profile.config!;
	const [primary, secondary] = [theme!.primary, theme!.secondary].map((c) => (chalk as any)[c!] || chalk.whiteBright);

	const createChoice = (value: Action, search?: string) => {
		const item = (msgs as any)[value];
		const message = item?.message || "";
		const description = item?.description || "";

		return {
			description: secondary(`\n${description}`),
			name: search ? message.replace(search, primary(search)) : message,
			value,
		};
	};

	const actions = {
		[Action.EMAIL]: () => {
			openUrl(`mailto:${profile.personal.displayEmail}?subject=Hi%20${profile.personal.name.split(" ")?.[0]}!`);
			console.log(`\n\n${msgs!.email!.success}\n`);
		},
		[Action.RESUME]: () => {
			openUrl(profile.personal.resume || "https://cv.ritik.me");
			console.log(`\n\n${msgs!.resume!.success}\n`);
		},
		[Action.MEETING]: () => {
			openUrl(profile.personal.meeting || "https://meet.ritik.me");
			console.log(`\n\n${msgs!.meeting!.success}\n`);
		},
		[Action.EXIT]: () => console.log(`\n\n${msgs!.exit!.success}\n`),
	};

	select({
		choices: [createChoice(Action.EMAIL, "Email"), createChoice(Action.RESUME, "Resume"), createChoice(Action.MEETING, "Meeting"), createChoice(Action.EXIT)],
		message: "Choose an Action",
	}).then((answer) => actions[answer]());
};
