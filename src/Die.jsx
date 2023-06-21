/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import { forwardRef } from 'react';

const Die = forwardRef((props, ref) => {
    const styles = {
        backgroundColor: props.isHeld ? "#FCBA28" : "white"
    }
    return (
        <div 
            tabIndex="0"
            aria-label={`Die with a value of ${props.value}. ${props.isHeld ? "Frozen" : "Not frozen"}`}
            className="die-face" 
            style = {styles} 
            onClick={props.handleHold}
            ref={ref}
        >
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
})

export default Die;
