MAIN BRANCH: 
(using just 5 dice for faster testing)
- aria-live after a win
- focus on first UNHELD die after a win
- SKIPS held dice (different from main branch, same as skipHeldDie)
- DOES SEND FOCUS on button after win



In order to create the Teanzies app, I utilized a variety of modern web development techniques and 
React features to create an interactive and accessible dice game.

I build this React project as part of scrimba.com's course "Learn React."

Here are the key technical aspects of the application:

1. **React Hooks**: I used multiple React Hooks to manage state and side effects in the application. 
- `useState` hook to initialize and manage state for the `dice` and `tenzies` variables. 
- `useEffect` hook to check if the dice are held and all dice have the same value. 
- `useRef` hook to manage the focus on the first dice.

2. **forwardRef Function**: It is my first time using the `useRef` and `forwardRef`. From reading the documentation I learned that the `forwardRef` function is necessary to create a reference for the `Die` component. This allowed me to pass a `ref` from the parent component `App` to the child component `Die`, giving the parent direct access to the child's DOM node. 

3. **Dynamic component rendering**: I used the `map` function (my favorite!!!) to dynamically create a `Die` component for each element in the `dice` array. This is a common pattern in React for creating multiple instances of a component based on an array of data. 

5. **Conditional rendering**: As is often the case in React, my app relies on conditional rendering to alter the UI based on the game state. For example, the `Roll` button's text changes to "New Game" when the player wins.

6. **Immutable state updates**: When updating the dice array, my app creates a new array instead of mutating the old one directly. This adheres to React's principle of immutable state updates. 

7. Third-party libraries used: 
- the `nanoid` library to generate a unique identifier for each die. 
- the `react-confetti` library to show a confetti animation when a player wins.

8. **CSS-in-JS**: I used inline styles to dynamically change the background color of the `Die` component based on whether it's held or not.

9. **Accessibility**: I utilized ARIA properties for better accessibility:
- `tabIndex` property to specify the tab order of an element 
- `aria-label` to provide a text description for screen readers

9. **Flexbox and CSS Grid** to layout the components on the screen and enable a responsive design.




