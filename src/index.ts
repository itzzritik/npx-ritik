import axios from "axios";
import DrawCard from "./DrawCard";
import Prompt from "./Prompt";

const run = async () => {
    console.clear();

    const profile = await axios.get('https://raw.githubusercontent.com/itzzritik/ItzzRitik/main/profile/profile.json')

    DrawCard(profile.data);
    Prompt(profile.data);
}

run();