import { useState, useEffect, useRef } from 'react'
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Die from "./Die"
import './App.css'

export default function App() {
  
  const firstUnheldDieRef = useRef(null)
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
    let firstUnheldFound = false;

    setDice(oldDice => oldDice.map(die => {
        if(!firstUnheldFound && !die.isHeld) {
            firstUnheldFound = true;
            return {
                ...generateNewDie(),
                isFirstUnheld: true,
            };
        } else {
            return {
                ...(die.isHeld ? die : {...generateNewDie(), isFirstUnheld: false}),
            };
        }
    }));

    if(firstUnheldDieRef.current) {
        firstUnheldDieRef.current.focus();
    }

    if(tenzies) {
        setTenzies(false);
    }
  }

      
  function holdDice(id) {
      setDice(oldDice => oldDice.map(die => {
          return die.id === id ? 
              {...die, isHeld: !die.isHeld} :
              die
      }))
  }

  const diceElements = dice.map((die) => (
    <Die 
      key={die.id} 
      value={die.value} 
      isHeld={die.isHeld} 
      handleHold={() => holdDice(die.id)}
      isFirstUnheld={die.isFirstUnheld}
      ref={firstUnheldDieRef}
    />
  ))
  
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
        >
            {tenzies ? "New Game" : "Roll"}
        </button>
    </main>
  )
}




