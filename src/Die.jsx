/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */


// REMOVE REF IF NO NEED FOR FOCUS ON FIRST DIE
import { forwardRef } from 'react';

const Die = forwardRef((props, ref) => {
    const styles = {
        backgroundColor: props.isHeld ? "#FCBA28" : "white"
    }
    return (
        <button 
            tabIndex={props.isHeld ? -1 : 0 }
            aria-label={`Value of ${props.value}. ${props.isHeld ? "Frozen" : "Not frozen"}`}
            className="die-face" 
            style = {styles} 
            onClick={props.handleHold}
            ref={ref}
        >
            <h2 className="die-num">{props.value}</h2>
        </button>
    )
})

export default Die;


