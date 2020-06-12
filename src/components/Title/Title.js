import React from "react";

import classes from "./Title.module.css";

const title = (props) => {
  return (
    <div>
      <h1 className={classes.Title}>{props.title}</h1>
    </div>
  );
};

export default title;
