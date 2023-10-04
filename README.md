# Tenzies

A tiny but accessibly-strong app built with React!

Live site: [Tenzies](https://corina-tenzies.netlify.app/)
<br>

<img width=600px alt="Screenshot of the end of the game of tenzies. Congratulations message displayed. Confetti in the background" src="https://github.com/CorinaMurg/tenzies/assets/115652409/7c2db747-3de9-4e4b-ae98-0c17fa046013">
<br>

## How to Play
Tenzies is a dice-based game where players roll a set of ten dice with the aim of achieving the same value across all dice. The challenge lies in deciding which dice to freeze or hold after each roll to get closer to the winning condition. Once all dice display the same number, the game celebrates the win with a confetti effect and allows players to start a new game.
## Challenges
<br>This app was a significant milestone for me. For the first time, I utilized React's forwardRef to manage focus, which was one of the most challenging aspects of the project. I'm particularly proud of this work because I successfully integrated all the required accessibility features.
<br>
<br>**Accessibility Aspects**: 
- `aria-label` is used to provide a text description for screen readers
- `tabIndex` property is added to specify the tab order of an element
- `aria-live` after a win is linked to the congratulations message
- focus goes to first die at initial render
- a selected die is frozen if its value equals the value of already selected die or dice
- focus returns to the roll button after win and during play

## Key technical aspects 🔎
**React Hooks**: I used multiple React Hooks to manage state and side effects in the application. 
- `useState` hook to initialize and manage state for the `dice` and `tenzies` variables. 
- `useEffect` hook to check if the dice are held and all dice have the same value. 
- `useRef` hook to manage the focus on the first dice.

**forwardRef Function**: It is my first time using the `useRef` and `forwardRef`. I ran into issues trying to manage focus. From reading the documentation I learned that the `forwardRef` and `useRef` can be employed for that purpose. The `forwardRef` function is necessary to create a reference for the `Die` component. This allowed me to pass a `ref` from the parent component `App` to the child component `Die`, giving the parent direct access to the child's DOM node. 

**Dynamic component rendering**: I used the `map` function (my favorite!!!) to dynamically create a `Die` component for each element in the `dice` array. This is a common pattern in React for creating multiple instances of a component based on an array of data. 

**Conditional rendering**: As is often the case in React, my app relies on conditional rendering to alter the UI based on the game state. For example, the `Roll` button's text changes to "New Game" when the player wins.

**Immutable state updates**: When updating the dice array, my app creates a new array instead of mutating the old one directly. This adheres to React's principle of immutable state updates. 

**Third-party libraries used:**
- the `nanoid` library to generate a unique identifier for each die. 
- the `react-confetti` library to show a confetti animation when a player wins.

**CSS-in-JS**: I used inline styles to dynamically change the background color of the `Die` component based on whether it's held or not.

**Flexbox and CSS Grid** to layout the components on the screen and enable a responsive design.







