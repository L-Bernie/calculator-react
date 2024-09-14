import "./App.css";
import { useState, useEffect } from "react";
import { NumericFormat } from 'react-number-format';

function App() {
  const [preState, setPreState] = useState("");  // Stores the first number
  const [curState, setCurState] = useState("");  // Stores the second number
  const [input, setInput] = useState("0");       // What's shown on the screen
  const [operator, setOperator] = useState(null); // The current operator
  const [total, setTotal] = useState(false);     // Determines if total is shown

  const inputNum = (e) => {
    if (curState.includes(".") && e.target.innerText === ".") return;

    // If total is true, reset the input to start a new calculation
    if (total) {
      setPreState("");  // Reset previous state
      setCurState(e.target.innerText);  // Start fresh with the new input
      setTotal(false);  // No longer showing the result
    } else {
      curState
        ? setCurState((prev) => prev + e.target.innerText)  // Appending digits to the current number
        : setCurState(e.target.innerText);  // Setting first digit if it's empty
    }
  };

  useEffect(() => {
    setInput(curState || preState || "0");  // Display curState if it's there, otherwise preState
  }, [curState, preState]);

  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);  // Sets the operator (+, -, *, /)

    // If curState has a value, we can perform an immediate calculation
    if (curState === "") return;  // Ignore if the current state is empty

    // If a previous state already exists, calculate the result with the current state
    if (preState !== "") {
      equals();  // Perform the calculation immediately
    } else {
      setPreState(curState);  // Store the first number
      setCurState("");  // Clear the current input to allow for the second number
    }
  };

  const equals = (e) => {
    if (e?.target.innerText === "=") {
      setTotal(true);
    }
    
    if (!operator || !preState || !curState) return;  // Ensure both numbers and operator are valid

    let result;
    switch (operator) {
      case "/":
        result = String(parseFloat(preState) / parseFloat(curState));
        break;
      case "+":
        result = String(parseFloat(preState) + parseFloat(curState));
        break;
      case "X":
        result = String(parseFloat(preState) * parseFloat(curState));
        break;
      case "-":
        result = String(parseFloat(preState) - parseFloat(curState));
        break;
      default:
        return;
    }
    
    setInput(result);  // Display the result
    setPreState(result);  // Store the result as the new `preState` for further operations
    setCurState("");  // Clear the current state for future input
    setOperator(null);  // Reset the operator
    setTotal(true);  // Result is shown, total is true
  };

  const minusPlus = () => {
    if (curState.charAt(0) === "-") {
      setCurState(curState.substring(1));
    } else {
      setCurState("-" + curState);
    }
  };

  const percent = () => {
    preState
      ? setCurState(String((parseFloat(curState) / 100) * preState))
      : setCurState(String(parseFloat(curState) / 100));
  };

  const reset = () => {
    setPreState("");
    setCurState("");
    setInput("0");
    setOperator(null);
    setTotal(false);
  };

  return (
    <div className='container'>
      <div className='wrapper'>
      <div className='screen'>
          {input !== "" || input === "0" ? (
            <NumericFormat
              value={input}
              displayType={"text"}
              thousandSeparator={true}
            />
          ) : (
            <NumericFormat
              value={preState}
              displayType={"text"}
              thousandSeparator={true}
            />
          )}
        </div>
        <div className='btn light-gray' onClick={reset}>
          AC
        </div>
        <div className='btn light-gray' onClick={percent}>
          %
        </div>
        <div className='btn light-gray' onClick={minusPlus}>
          +/-
        </div>
        <div className='btn orange' onClick={operatorType}>
          /
        </div>
        <div className='btn' onClick={inputNum}>
          7
        </div>
        <div className='btn' onClick={inputNum}>
          8
        </div>
        <div className='btn' onClick={inputNum}>
          9
        </div>
        <div className='btn orange' onClick={operatorType}>
          X
        </div>
        <div className='btn' onClick={inputNum}>
          4
        </div>
        <div className='btn' onClick={inputNum}>
          5
        </div>
        <div className='btn' onClick={inputNum}>
          6
        </div>
        <div className='btn orange' onClick={operatorType}>
          +
        </div>
        <div className='btn' onClick={inputNum}>
          1
        </div>
        <div className='btn' onClick={inputNum}>
          2
        </div>
        <div className='btn' onClick={inputNum}>
          3
        </div>
        <div className='btn orange' onClick={operatorType}>
          -
        </div>
        <div className='btn zero' onClick={inputNum}>
          0
        </div>
        <div className='btn' onClick={inputNum}>
          .
        </div>
        <div className='btn' onClick={equals}>
          =
        </div>
      </div>
    </div>
  );
}

export default App;
