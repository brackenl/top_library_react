import React from "react";

import classes from "./Book.module.css";

const book = (props) => {
  return (
    <div className={classes.Book}>
      <h3>{props.title}</h3>
      <p>Author: {props.author}</p>
      <p>Pages: {props.pages}</p>
      <div className={classes.ReadButton}>
        <button id={props.id} onClick={(e) => props.clicked(props.id)}>
          {props.read ? "Read" : "Not read"}
        </button>
      </div>
      <button
        className={classes.DeleteButton}
        onClick={(e) => props.deleteBook(props.id)}
      >
        X
      </button>
    </div>
  );
};

export default book;
