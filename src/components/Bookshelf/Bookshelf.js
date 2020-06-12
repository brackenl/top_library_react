import React from "react";

import Book from "../Book/Book";
import classes from "./Bookshelf.module.css";

const bookshelf = (props) => {
  const books = props.bookList.map((book) => {
    return (
      <Book
        title={book.title}
        author={book.author}
        pages={book.pages}
        key={book.title}
        read={book.read}
        clicked={props.toggleRead}
        id={book.id}
        deleteBook={props.deleteBook}
      />
    );
  });

  return <div className={classes.Bookshelf}>{books}</div>;
};

export default bookshelf;
