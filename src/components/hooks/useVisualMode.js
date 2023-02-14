import { useState } from "react";

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]); // This line is new!


    function transition(newMode, replace = false) { //take in a new mode and update the mode state with the new value
        if (replace) {
          setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);//error, skip status view back to initial
        } else {
          setHistory((prev) => [...prev, newMode]) //normal
        }
      }
    

    function back() { //allows us to go back to the previous mode
        setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
    }



    return { mode: history[history.length - 1], transition, back };
}


