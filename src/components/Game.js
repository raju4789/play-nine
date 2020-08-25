import React, { useState, useEffect } from 'react';

import { UTILS } from '../util';

import PlayNumber from './PlayNumber';
import DisplayStars from './DisplayStars';
import PlayAgain from './PlayAgain';

// custom hook
const useGameState = () => {
    console.log(sessionStorage.getItem('highScore'))
    const [stars, setStars] = useState(UTILS.random(1, 9));
    const [availableNums, setAvailableNums] = useState(UTILS.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);
    const [highScore, setHighScore] = useState(localStorage.getItem('highScore') || 0);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        if (secondsLeft > 0 && availableNums.length > 0) {
            const timerId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);

            return () => clearTimeout(timerId);
        }
    });

    const setGameState = (newCandidateNums) => {
        if (UTILS.sum(newCandidateNums) !== stars) {
            setCandidateNums(newCandidateNums);
        } else {
            let newAvailableNums = availableNums.filter(num => !newCandidateNums.includes(num));
            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
            setStars(UTILS.randomSumIn(newAvailableNums, 9));
        }
    };

    const resetGame = () => {
        setStars(UTILS.random(1, 9));
        setAvailableNums(UTILS.range(1, 9));
        setCandidateNums([]);
        setSecondsLeft(10);
        setScore(0);
        setGameOver(false);
    };

    const gameStatus = (availableNums.length === 0) ? 'won' :
        (secondsLeft === 0) ? 'lost' : 'active';

    if (!gameOver && (gameStatus === 'won' || gameStatus === 'lost')) {
        setGameOver(true);
        setScore(secondsLeft);
        if (score > highScore) {
            sessionStorage.setItem('highScore', score);
            console.log(localStorage.getItem('highScore'))
            setHighScore(score);
        }
    }

    return { stars, availableNums, candidateNums, secondsLeft, gameStatus, score, highScore, setGameState, resetGame };
};

const Game = () => {
    const { stars, availableNums, candidateNums, secondsLeft, gameStatus, score, highScore, setGameState, resetGame } = useGameState();

    const areCandidatesWrong = () => {
        return UTILS.sum(candidateNums) > stars;
    };

    const numberStatus = (number) => {

        if (!availableNums.includes(number)) {
            return 'used';
        }

        if (candidateNums.includes(number)) {
            return areCandidatesWrong() ? 'wrong' : 'candidate';
        }

        return 'available';
    };

    const onNumberClick = (number, currentStatus) => {
        if (currentStatus === 'used' || gameStatus !== 'active') {
            return;
        }
        let newCandidateNums = (currentStatus === 'available') ?
            candidateNums.concat(number) :
            candidateNums.filter(n => n !== number);

        setGameState(newCandidateNums);
    };

    return (
        <div className="game">
            <div className="body">
                <div className="left">
                    High Score :{highScore}
                </div>
                <div className="right">
                    Score :{score}
                </div>
            </div>
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
        </div>
            <div className="body">
                <div className="left">
                    {
                        (gameStatus !== 'active') ? <PlayAgain onPlayAgainClick={resetGame} gameStatus={gameStatus} /> : <DisplayStars stars={stars} />
                    }
                </div>
                <div className="right">
                    {
                        UTILS.range(1, 9).map(id => (
                            <PlayNumber
                                key={id}
                                id={id}
                                status={numberStatus(id)}
                                onNumberClick={onNumberClick}
                            />
                        ))
                    }
                </div>
            </div>
            <div className="timer">Time Remaining: {secondsLeft}</div>
        </div >
    );
};

export default Game;

