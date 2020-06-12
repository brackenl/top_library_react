import React from "react";

import Button from "../Button/Button";
import classes from "./NewBookForm.module.css";

const NewBookForm = (props) => {
  return (
    <div className={classes.FormContainer}>
      <form className="form" id="form">
        <h2 className={classes.FormHeading}>Add a Book</h2>

        <div className={classes.FormFields}>
          {props.form.map((item) => {
            return (
              <div className={classes.FormGroup} key={item.label}>
                <label>{item.label}</label>
                <input
                  type={item.type}
                  id={item.label}
                  value={item.value}
                  checked={item.checked}
                  onChange={props.handleInput}
                  required
                />
                {!item.valid && item.touched ? (
                  <span className="error" aria-live="polite">
                    {item.errorMessage}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>

        <div>
          <Button
            className={classes.Button}
            buttonText="Enter"
            clicked={props.submit}
          ></Button>
          <Button
            className={classes.Button}
            buttonText="Cancel"
            clicked={props.cancel}
          ></Button>
        </div>
      </form>
    </div>
  );
};

export default NewBookForm;
