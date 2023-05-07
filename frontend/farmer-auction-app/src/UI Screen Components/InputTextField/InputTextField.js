
const InputTextField = (props) => {

  const inputTextFieldDataChangeHandler = (event) => {
    props.onChange({ [props.mappedKey]: event.target.value });
  };

  var inputFieldElement = (
    <input
      type="text"
      value={props.value}
      onChange={inputTextFieldDataChangeHandler}
      placeholder={props.placeHolder}
      required
    />
  );

  if (props.isRequired === false) {
    inputFieldElement = (
      <input
        type="text"
        value={props.value}
        placeholder={props.placeHolder}
        onChange={inputTextFieldDataChangeHandler}
      />
    );
  }

  const styleName = props.children;

  return (
    <div className={styleName}>
      {inputFieldElement}
      <span></span>
      <label>{props.label}</label>
    </div>
  );
};

export default InputTextField;
