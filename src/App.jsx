/* eslint-disable no-unused-vars */
import { useState } from 'react'
import {nanoid} from "nanoid"
import Die from "./Die"
import './App.css'

export default function App() {

  const [dice, setDice] = useState(allNewDice())
  
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
      setDice(oldDice => oldDice.map(die => {
          return die.isHeld ? 
              die :
              generateNewDie()
      }))
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
          <div className="dice-container">
              {diceElements}
          </div>
          <button className="roll-dice" onClick={rollDice}>Roll</button>
      </main>
  )
}