
import { useState, useEffect, useRef, createRef } from 'react'
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Die from "./Die"
import './App.css'


export default function App() {

  const newGameRef = useRef(null)
  // the roll button has been clicked at least once
  const [hasStarted, setHasStarted] = useState(false);
  //ref for first die; used at the start of a new game (but NOT at initial render)
  const firstDieRef = useRef(null)
  //array of refs, with one ref for each die
  const diceRefs = Array.from({ length: 10 }, () => createRef());

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
    }
  }, [dice])

  function generateNewDie() {
      return {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
      }
  }
  
  function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
          newDice.push(generateNewDie())
      }
      return newDice
  }

  function rollDice() {
    setHasStarted(true);
    if(!tenzies) {
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
                die :
                generateNewDie()
        }))   
        // after a roll, send focus to first unheld die 
        for(let i = 0; i < dice.length; i++) {
          if(!dice[i].isHeld) {
              diceRefs[i].current.focus();
              break;
          }
        }

    } else {
        setTenzies(false)
        setDice(allNewDice())
        // In React, state updates are asynchronous. 
        // This means when you call a function like setTenzies(false) or setDice(allNewDice()), 
        // React doesn't immediately update the state and re-render the component. 
        // Instead, it schedules the update to be processed later on, and it batches multiple 
        // updates together for performance reasons. Because of this, if you try to interact 
        // with the DOM immediately after scheduling a state update 
        // (like calling newGameRef.current.focus() right after setTenzies(false) and 
        // setDice(allNewDice())), the DOM may not have been updated yet to reflect the new state. 
        // In this case, the "New Game" button might not be ready to accept focus.
        // NOT WORKING HERE, MOVE INSIDE useEffect
        // newGameRef.current.focus();
    }
  }
  
  useEffect(() => {
    if (tenzies) {
        // To ensure the DOM has been updated, use it inside the useEffect hook. 
        // useEffect allows us to run side effects (like setting focus to a DOM element) 
        // in response to changes in our component's state or props. Inside a useEffect hook,
        // with tenzies as a dependency, we're telling React to run that code after it has 
        // processed any updates to tenzies and re-rendered the component.
        // SEND FOCUS TO BUTTON
        newGameRef.current.focus();
    } else if (hasStarted) {
        // send focus to first die when roll is clicked
        firstDieRef.current && firstDieRef.current.focus();
    }
  }, [tenzies, hasStarted]);

  
  function holdDice(id) {
      setDice(oldDice => oldDice.map(die => {
          return die.id === id ? 
              {...die, isHeld: !die.isHeld} :
              die
      }))
  }

  const diceElements = dice.map((die, index) => {
    const allUnheld = dice.every(die => !die.isHeld);
    return (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            handleHold={() => holdDice(die.id)}
            ref={allUnheld && index === 0 ? firstDieRef : diceRefs[index]}  
        />
    );
  });

  
  return (
    <main>
        {tenzies && <Confetti />}
        <div aria-live="polite" className="visually-hidden">{tenzies ? "Congratulations, you won! Roll to play again" : ""}</div>
        <h1 className="title" tabIndex="0">Tenzies</h1>
        <p className="instructions" tabIndex="0">
          Roll until all dice are the same. 
          Click each die to freeze it at its current value between rolls.
        </p>
        <div className="dice-container">
            {diceElements}
        </div>
      
        <button 
          className="roll-dice" 
          onClick={rollDice}
          ref={newGameRef}
        >
            {tenzies ? "New Game" : "Roll"}
        </button>
    </main>
  )
}
