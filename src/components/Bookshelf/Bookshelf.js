import React from "react";

import Book from "../Book/Book";
import Spinner from "../Spinner/Spinner";
// import Books from "../Books/Books";
import classes from "./Bookshelf.module.css";

const bookshelf = (props) => {
  return (
    <div className={classes.Bookshelf}>
      {props.loading ? (
        <Spinner />
      ) : (
        props.bookList.map((book) => {
          return (
            <Book
              title={book.title}
              author={book.author}
              pages={book.pages}
              read={book.read}
              key={book.key}
              id={book.id}
              clicked={props.toggleRead}
              deleteBook={props.deleteBook}
            />
          );
        })
      )}
    </div>
  );
};

export default bookshelf;
