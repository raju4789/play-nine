import React from 'react';
import { COLORS } from "../util";

const PlayNumber = props => {

    return <button
        className="number"
        style={{ backgroundColor: COLORS[props.status] }}
        onClick={() => props.onNumberClick(props.id, props.status)}
    >
        {props.id}
    </button>
};

export default PlayNumber;