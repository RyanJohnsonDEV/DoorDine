import { useState } from 'react';

function useInput(validateValue) {
  const [enteredValue, setEnteredValue] = useState('');
  const [inputWasTouched, setInputWasTouched] = useState(false);

  const inputIsValid = validateValue(enteredValue);
  const hasError = !inputIsValid && inputWasTouched;

  function onBlurHandler() {
    setInputWasTouched(true);
  }

  function inputChangeHandler(event) {
    setEnteredValue(event.target.value);
  }

  function reset() {
    setInputWasTouched(false);
    setEnteredValue('');
  }

  return {
    value: enteredValue,
    isValid: inputIsValid,
    error: hasError,
    touched: inputWasTouched,
    setTouched: setInputWasTouched,
    onBlurHandler,
    inputChangeHandler,
    reset,
  };
}

export default useInput;
