import './Input.css';

function Input(props) {
  function checkButtonAndValue(e) {
    props.checkButton();

    if (e.target.value < 0) {
      e.target.value = 0;
    }
  }

  return (
    <div className="input">
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} onChange={checkButtonAndValue} />
    </div>
  );
}

export default Input;
