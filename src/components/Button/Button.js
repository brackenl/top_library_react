import React from "react";

import classes from "./Button.module.css";

const button = (props) => {
  return (
    <button className={classes.Button} onClick={props.clicked}>
      {props.buttonText}
    </button>
  );
};

export default button;
