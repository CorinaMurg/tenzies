
import { useState, useEffect, useRef } from 'react'
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Die from "./Die"
import './App.css'


export default function App() {

  const buttonFocusRef = useRef(null)
  
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
      for (let i = 0; i < 5; i++) {
          newDice.push(generateNewDie())
      }
      return newDice
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => (die.isHeld ? die : generateNewDie()))
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
    buttonFocusRef.current.focus();
  }
  
  useEffect(() => {
    if (tenzies) {
      buttonFocusRef.current.focus();
    } 
    
  }, [tenzies]);


  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
        // if die already held, unhold it 
        if (die.isHeld && die.id === id) {
            return {...die, isHeld: false}
        }
        // if die not held, only hold it if there are no dice held 
        // or all held dice have the same value as this die
        else if (!die.isHeld && die.id === id) {
            const heldDiceValues = oldDice.filter(d => d.isHeld).map(d => d.value);
            if (heldDiceValues.length === 0 || heldDiceValues.every(val => val === die.value)) {
                return {...die, isHeld: true}
            }
        }
        return die;
    }))
  }


  const diceElements = dice.map((die) => {
    return (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            handleHold={() => holdDice(die.id)}
        />
    );
  });

  const congrats = "Congratulations, you won! Roll to play again.";

  return (
    <main>
      {tenzies && <h3 className="congrats">{congrats}</h3>}
      <div aria-live="polite" className="visually-hidden">{tenzies ? congrats : ""}</div>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.
      </p>
      <div className="dice-container">
        {diceElements}
      </div>
    
      <button 
        className="roll-dice" 
        onClick={rollDice}
        ref={buttonFocusRef}
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  )
}
