import classes from "./InputTextField.module.css";

const InputTextField = (props) => {
  console.log("console.log(props.isRequired)");
  console.log(props.isRequired);

  const inputTextFieldDataChangeHandler = (event) => {
    props.onChange({ [props.mappedKey]: event.target.value });
  };

  var inputFieldElement = (
    <input
      type="text"
      value={props.value}
      onChange={inputTextFieldDataChangeHandler}
      required
    />
  );

  if (props.isRequired === false) {
    inputFieldElement = (
      <input
        type="text"
        value={props.value}
        onChange={inputTextFieldDataChangeHandler}
      />
    );
  }

  return (
    <div className={classes.txt_field}>
      {inputFieldElement}
      <span></span>
      <label>{props.label}</label>
    </div>
  );
};

export default InputTextField;
