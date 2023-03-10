import React, { useContext, useEffect, useState } from "react";
import { getCheckPatern } from "../../utils/GeneratorUtils";
import { GlobalContext } from "../context/Global";
import styles from "../assets/css/form.module.css";

/**
 * It's a function that takes in a bunch of props and returns a div with a label, an input, and a small tag.
 * @returns A React Component
 */
function InputText({ label, type, placeholder, name, changeValue, tooltip, hidden, isConst }) {
  const { form, setform, temp } = useContext(GlobalContext);
  const [text, settext] = useState(null);
  const [isRequired, setisRequired] = useState(false);

  /* It's setting the state of the form to the value of the isConst variable. */
  useEffect(() => {
    if (isConst !== false) {
      setform({ [name]: isConst });
    }
  }, []);

  useEffect(() => {
    settext(form[name]);
  }, [form[name]]);

  /**
   * It takes a number, formats it to a string, and then sets the state of the text variable to that string.
   * @param e - The event object
   */
  const handleChangeInput = (e) => {
    changeValue(e);
    //const formatedNumber = formatNumberWithSpaces(e.target.value);
    const isPattern = getCheckPatern(type, e.target.value);
    if (isPattern) {
      setisRequired(false);
    } else {
      setisRequired(true);
    }
    settext(e.target.value);
  };
  return (
    <div className="form-group">
      <label>{label}</label>
      {tooltip && (
        <span className="" data-toggle="tooltip" data-placement="top" title={tooltip}>
          ?
        </span>
      )}

      <input
        type={type}
        value={isConst === false ? (temp ? temp[name] : text == null ? "" : text) : isConst}
        className={isRequired ? `form-control ${styles.outline_red}` : "form-control"}
        hidden={hidden}
        placeholder={placeholder}
        onChange={handleChangeInput}
        name={name}
        disabled={isConst === false ? false : true}
      />
    </div>
  );
}

export default InputText;
