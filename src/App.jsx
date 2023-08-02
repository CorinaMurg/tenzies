
import { useState, useEffect, useRef, createRef } from 'react'
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Die from "./Die"
import './App.css'


export default function App() {
  // the roll button has been clicked
  const [hasStarted, setHasStarted] = useState(false);
  const firstDieRef = useRef(null)
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
        // Set the focus to the first unheld die after a roll
        for(let i = 0; i < dice.length; i++) {
          if(!dice[i].isHeld) {
              diceRefs[i].current.focus();
              break;
          }
        }

    } else {
        setTenzies(false)
        setDice(allNewDice())
    }
  }
  
  useEffect(() => {
    if (hasStarted && tenzies === false) {
      firstDieRef.current && firstDieRef.current.focus();
    }
  }, [hasStarted, tenzies]);
  
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
        >
            {tenzies ? "New Game" : "Roll"}
        </button>
    </main>
  )
}
