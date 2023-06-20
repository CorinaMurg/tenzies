/* eslint-disable no-unused-vars */
import { useState } from 'react'
import Die from "./Die"
import './App.css'


export default function App() {
  const [diceValues, setDiceValues] = useState(allNewDice())
  
  function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
          newDice.push(Math.ceil(Math.random() * 6))
      }
      return newDice
  }
  
  const diceElements = diceValues.map(die => <Die value={die} />)
  
  return (
      <main>
          <div className="dice-container">
              {diceElements}
              <button onClick=>Roll</button>
          </div>
      </main>
  )
}

