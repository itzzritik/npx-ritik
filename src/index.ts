import DrawCard from './DrawCard.js';
import Prompt from './Prompt.js';

const run = async () => {
	console.clear();

	const response = await fetch('https://raw.githubusercontent.com/itzzritik/ItzzRitik/main/profile/profile.json');
	const profile = await response.json();

	DrawCard(profile);
	Prompt(profile);
};

run();
