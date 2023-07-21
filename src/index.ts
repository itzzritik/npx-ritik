import axios from "axios";
import DrawCard from "./DrawCard.js";
import Prompt from "./Prompt.js";

const run = async () => {
    console.clear();

    const profile = await axios.get('https://raw.githubusercontent.com/itzzritik/ItzzRitik/main/profile/profile.json')

    DrawCard(profile.data);
    Prompt(profile.data);
}

run();