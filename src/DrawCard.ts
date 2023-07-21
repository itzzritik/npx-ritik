import chalk from 'chalk';
import boxen from 'boxen';
import { getBanner, padCenter, startCase } from './utils.js';

const tip = [`Tip: Try ${chalk.cyanBright.bold("cmd/ctrl + click")} on the links above`, null].join("\n");

const footer = [
    "I am actively seeking new opportunities and welcome any inquiries",
    "Please feel free to contact me for questions or casual greetings",
    "I will make every effort to respond promptly",
    "My inbox remains open for your correspondence.",
]
export default function DrawCard (profile) {
    const fName = profile.personal.displayName.split(' ')[0]
    const website = profile.personal.displayEmail.replace(/.*@/, "")
    const CardData = [
        null,
        chalk.bold.green(padCenter(profile.personal.displayName)),
        chalk.blackBright(padCenter(profile.personal.currentRole)),
        null,
    ]
    profile.socialHandles.forEach((social) => {
        CardData.push(getBanner(social.platform, startCase(social.platform), `${social.url}/${social.handle}`))
    })
    CardData.push(getBanner('website', 'Portfolio', website))
    CardData.push(getBanner('npx', 'Npx', `npx ${fName.toLowerCase()}`))
    CardData.push(null)
    footer.forEach((line) => {
        CardData.push(chalk.italic.whiteBright(padCenter(line)))
    })
    CardData.push(null)

    const Card = boxen(CardData.join("\n"), {
        margin: 1,
        float: 'center',
        borderStyle: "single",
        borderColor: "green"
    });

    console.log(Card);
    console.log(tip);
}
