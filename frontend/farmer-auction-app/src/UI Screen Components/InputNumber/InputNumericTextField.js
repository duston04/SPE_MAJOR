import classes from "../InputTextField/InputTextField.module.css";

const InputNumericTextField = (props) => {
  const inputTextFieldDataChangeHandler = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    console.log(parseInt(props.requiredLength));
    if (value.length > parseInt(props.requiredLength)) {
      return;
    }
    props.onChange({ [props.mappedKey]: event.target.value });
  };

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  return (
    <div className={props.children}>
      <input
        type="number"
        value={props.value}
        onChange={inputTextFieldDataChangeHandler}
        onKeyDown={blockInvalidChar}
        placeholder={props.placeHolder}
        required
      />
      <span></span>
      <label>{props.label}</label>
    </div>
  );
};

export default InputNumericTextField;
