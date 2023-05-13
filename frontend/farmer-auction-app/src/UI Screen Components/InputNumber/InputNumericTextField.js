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
    <input
      type="number"
      value={props.value}
      onChange={inputTextFieldDataChangeHandler}
      onKeyDown={blockInvalidChar}
      placeholder={props.placeHolder}
      className={classes.txt_field_input}
      required
    />
  );
};

export default InputNumericTextField;
