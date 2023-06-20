
import { useState, useEffect } from 'react'
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Die from "./Die"
import './App.css'

export default function App() {

  const [dice, setDice] = useState(allNewDice())

  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    let countHeld = 0
    for (let i in dice) {
      if (dice[i].isHeld === true) {
        countHeld ++
      }
    }

    let countValue = 0
    const firstValue = dice[0].value
    for (let j in dice) {
      if (dice[j].value === firstValue) {
        countValue ++
      }
    }

    if (countHeld === 10 && countValue === 10) {
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
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
            die :
            generateNewDie()
    })) 
    } else {
        setTenzies(false)
        setDice(allNewDice())
    }
  }
      
  
  function holdDice(id) {
      setDice(oldDice => oldDice.map(die => {
          return die.id === id ? 
              {...die, isHeld: !die.isHeld} :
              die
      }))
  }

  
  const diceElements = dice.map(die => (
      <Die 
          key={die.id} 
          value={die.value} 
          isHeld={die.isHeld} 
          handleHold={() => holdDice(die.id)}
      />
  ))
  
  return (
      <main>
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
          >
              {tenzies ? "New Game" : "Roll"}
          </button>
      </main>
  )
}