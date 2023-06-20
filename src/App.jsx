/* eslint-disable no-unused-vars */
import { useState } from 'react'
import {nanoid} from "nanoid"
import Die from "./Die"
import './App.css'


export default function App() {
  
      const [dice, setDice] = useState(allNewDice())
      
      function allNewDice() {
          const newDice = []
          for (let i = 0; i < 10; i++) {
              newDice.push({
                value: Math.ceil(Math.random() * 6), 
                isHeld: true,
              id: nanoid() })
          }
          return newDice
      }
      
      function rollDice() {
          setDice(allNewDice())
      }
      
      const diceElements = dice.map(die => <Die key = {die.id} value={die.value} isHeld ={die.isHeld}/>)
      
      return (
          <main>
              <div className="dice-container">
                  {diceElements}
              </div>
              <button className="roll-dice" onClick={rollDice}>Roll</button>
          </main>
      )
  }

