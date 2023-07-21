#!/usr/bin/env node

'use strict'

import DrawCard from './DrawCard';
import Prompt from './Prompt';

const run = async () => {
    console.clear();
    DrawCard();
    Prompt();
}

run();