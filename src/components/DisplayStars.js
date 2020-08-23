import React from 'react';

import { UTILS } from "../util.js";

const DisplayStars = (props) => (
    <>
        {
            UTILS.range(1, props.stars).map(starId =>
                <div key={starId} className="star" />
            )
        }
    </>
);

export default DisplayStars;
