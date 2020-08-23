import React, { useState } from 'react';

import Game from './Game';
import { UTILS } from "./util.js";

const StarMatch = () => {
    const [gameId, setGameId] = useState(UTILS.random(1, 9));
    return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />
};

export default StarMatch;