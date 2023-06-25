import { useRef, useState } from 'react';
import Input from '../UI/Input';
import './MealItemForm.css';

function MealItemForm(props) {
  const inputRef = useRef();
  const [buttonDisabled, updateButtonDisabled] = useState('disabled');

  function addItem(event) {
    event.preventDefault();
    if (Number(inputRef.current.value) !== 0) {
      props.addItem(props.id, inputRef.current.value);
      inputRef.current.value = 0;
      updateButtonDisabled('disabled');
    }
  }

  function checkForButton() {
    if (Number(inputRef.current.value) < 0) {
      return;
    } else {
      if (Number(inputRef.current.value) !== 0) {
        updateButtonDisabled('');
      } else {
        updateButtonDisabled('disabled');
      }
    }
  }

  return (
    <form className="form">
      <Input
        label="Amount"
        input={{
          id: `amount_${props.id}`,
          type: 'number',
          min: 0,
          step: 1,
          defaultValue: 0,
          ref: inputRef,
        }}
        checkButton={checkForButton}
      />
      <button onClick={addItem} className={`button ${buttonDisabled}`}>
        + Add
      </button>
    </form>
  );
}

export default MealItemForm;
