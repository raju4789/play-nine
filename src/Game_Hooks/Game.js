import React, { useState, useEffect }from 'react';
import {UTILS, COLORS }from "./Util.js";
import "./Game.css";

const PlayNumber = props => {
    console.log(COLORS[props.status]);
    return <button
        className="number"
        style={{backgroundColor: COLORS[props.status]}}
        onClick={ () => props.onNumberClick(props.id, props.status)}
    >
        {props.id}
    </button>
};

const DisplayStars = (props) => (
    <>
        {
            UTILS.range(1, props.stars).map(starId =>
                <div key={starId} className="star" />
            )
        }
    </>
);

const PlayAgain = (props) => (
    <div className="game-done">
        <div
            className="message"
            style={{ color: props.gameStatus === 'lost' ? 'red' : 'green'}}
        >
            {(props.gameStatus === 'lost') ? 'Game Over' : 'Nicely Done'}
        </div>
        <button onClick={props.onPlayAgainClick}> Play Again </button>
    </div>
);

// custom hook
const useGameState = () => {
    const [stars, setStars]= useState(UTILS.random(1,9));
    const [availableNums, setAvailableNums] = useState(UTILS.range(1,9));
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);

    useEffect(() => {
        if(secondsLeft > 0 && availableNums.length > 0){
            const timerId = setTimeout(() =>{
                setSecondsLeft(secondsLeft-1);
            },1000);

            return () => clearTimeout(timerId);
        }
    });

    const setGameState = (newCandidateNums) => {
        if(UTILS.sum(newCandidateNums) !== stars){
            setCandidateNums(newCandidateNums);
        }else{
            let newAvailableNums = availableNums.filter(num => !newCandidateNums.includes(num));
            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
            setStars(UTILS.randomSumIn(newAvailableNums, 9));
        }
    };

    return {stars, availableNums, candidateNums, secondsLeft, setGameState};
};

const Game = (props) => {
    const {stars, availableNums, candidateNums, secondsLeft, setGameState} = useGameState();

    const areCandidatesWrong = () => {
        return UTILS.sum(candidateNums) > stars;
    };

    const gameStatus = (availableNums.length === 0) ? 'won' :
        (secondsLeft === 0) ? 'lost' : 'active';

    /*const resetGame = () => {
        setStars(UTILS.random(1,9));
        setAvailableNums(UTILS.range(1,9));
        setCandidateNums([]);
        setSecondsLeft(10);
    };*/

    const numberStatus = (number) => {

        if(!availableNums.includes(number)){
            return 'used';
        }

        if(candidateNums.includes(number)){
            return areCandidatesWrong() ? 'wrong' : 'candidate';
        }

        return 'available';
    };

    const onNumberClick = (number, currentStatus) => {
        if(currentStatus === 'used' || gameStatus !== 'active'){
            return;
        }
        let newCandidateNums = (currentStatus === 'available') ?
            candidateNums.concat(number) :
            candidateNums.filter(n => n !== number);

        setGameState(newCandidateNums);
    };

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>
            <div className="body">
                <div className="left">
                    {
                        (gameStatus !== 'active') ? <PlayAgain onPlayAgainClick={props.startNewGame} gameStatus={gameStatus}/> : <DisplayStars stars={stars}/>
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
        </div>
    );
};

const StarMatch = () => {
    const [gameId, setGameId]= useState(UTILS.random(1,9));
    return <Game key={gameId} startNewGame={() => setGameId(gameId+1)}/>
};



export default StarMatch;
