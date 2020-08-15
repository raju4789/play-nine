import React, { Component } from 'react';
import './Game.css';
import _ from 'lodash';
// get our fontawesome imports
import { faStar, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Stars = (props) => {

    let stars = [];
    for (let i = 0; i < props.randomNumberOfStars; i++) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className="istar"></FontAwesomeIcon>);
    }

    return (
        <div className="col-5">
            {stars}
        </div>
    );
};

const Button = (props) => {

    let button;
    switch(props.answerIsCorrect){
        case true:{
            button = <button className="btn btn-success" onClick={props.acceptAnswer}>
                <FontAwesomeIcon icon={faCheck} className="istar"></FontAwesomeIcon>                     </button>;
            break;
        }
        case false:{
            button = <button className="btn btn-danger">
                <FontAwesomeIcon icon={faTimes} className="istar"></FontAwesomeIcon>                     </button>;
            break;
        }
        default:{
            button = <button disabled={ props.selectedNumbers.length === 0 }> = </button>;
        }
    }
    return (
        <div className="col-2" onClick={props.checkAnswer}>
            {button}
        </div>
    );
};
const Answer = (props) => {
    return (
        <div className="col-5">
            {
                props.selectedNumbers.map((number, i) => <span key={i}
                                                               onClick={() => props.unSelectNumber(number)}>{number}</span>
                )}
        </div>
    );
};

const Numbers = (props) => {
    const numberClass = number => {
        if (props.selectedNumbers.indexOf(number) >= 0) {
            return 'selected';
        }
        if (props.usedNumbers.indexOf(number) >= 0) {
            return 'used';
        }
    };
    return (
        <div className="card text-center">
            <div>
                {
                    Numbers.list.map((number, i) =>
                        <span key={i} className={numberClass(number)}
                              onClick={() => props.selectNumber(number)}>{number}</span>
                    )}
            </div>
        </div>
    );
};

Numbers.list = _.range(1, 10);


class Game extends Component {
    state = {
        selectedNumbers: [],
        usedNumbers: [4,7],
        randomNumberOfStars: 1 + Math.floor(Math.random() * 9),
        answerIsCorrect : null
    };

    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {
            return;
        }
        this.setState(prevState => ({
            answerIsCorrect : null,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }));
    };

    unSelectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            answerIsCorrect : null,
            selectedNumbers: prevState.selectedNumbers.filter((number) => number !== clickedNumber)
        }));
    };

    checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect : prevState.randomNumberOfStars === prevState.selectedNumbers.reduce((acc, num)=> acc+num, 0)
        }));
    };

    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect : null,
            randomNumberOfStars: 1 + Math.floor(Math.random() * 9)
        }));
    };

    render() {
        const { randomNumberOfStars, selectedNumbers, usedNumbers } = this.state;
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr/>
                <div className="row">
                    <Stars randomNumberOfStars={randomNumberOfStars}/>
                    <Button selectedNumbers={selectedNumbers} checkAnswer={this.checkAnswer} answerIsCorrect={this.state.answerIsCorrect} acceptAnswer={this.acceptAnswer}/>
                    <Answer selectedNumbers={selectedNumbers} unSelectNumber={this.unSelectNumber}/>
                </div>
                <br/>
                <Numbers selectedNumbers={selectedNumbers} usedNumbers={usedNumbers} selectNumber={this.selectNumber}/>
            </div>
        );
    }
}

export default Game;
