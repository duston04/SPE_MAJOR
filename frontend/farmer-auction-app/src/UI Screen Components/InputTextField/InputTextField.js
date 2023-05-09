import classes from "./InputTextField.module.css";
const InputTextField = (props) => {
  const inputTextFieldDataChangeHandler = (event) => {
    props.onChange({ [props.mappedKey]: event.target.value });
  };
  const type = props.type === undefined ? "text" : props.type;

  if (props.isRequired === false) {
    return (
      <input
        type={type}
        value={props.value}
        placeholder={props.placeHolder}
        className={classes.txt_field_input}
        onChange={inputTextFieldDataChangeHandler}
      />
    );
  } else {
    return (
      <input
        type={type}
        value={props.value}
        onChange={inputTextFieldDataChangeHandler}
        placeholder={props.placeHolder}
        className={classes.txt_field_input}
        required
      />
    );
  }

  // const styleName = props.children;
};

export default InputTextField;
