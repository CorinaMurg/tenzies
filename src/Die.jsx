/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */


const Die = (props) => {
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
        >
            <h2 className="die-num">{props.value}</h2>
        </button>
    )
}

export default Die;


