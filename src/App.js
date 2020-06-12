import React, { useState } from "react";

import "./App.css";

import Title from "./components/Title/Title";
import Bookshelf from "./components/Bookshelf/Bookshelf";
import Button from "./components/Button/Button";
import NewBookForm from "./components/NewBookForm/NewBookForm";
import initialBooks from "./shared/initialBooks";
import formDetails from "./shared/formDetails";

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [books, setBooks] = useState(initialBooks);
  const [form, setForm] = useState([...formDetails]);

  const toggleFormHandler = () => {
    setShowForm(!showForm);
  };

  const inputHandler = (event) => {
    const newForm = form.slice();
    const relIndex = newForm.findIndex(
      (item) => item.label === event.target.id
    );
    if (event.target.type !== "checkbox") {
      newForm[relIndex].value = event.target.value;
    } else {
      newForm[relIndex].checked = event.target.checked;
    }
    setForm(newForm);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newBook = {
      title: form[0].value,
      author: form[1].value,
      pages: form[2].value,
      read: form[3].checked,
      id: books.length + 1,
    };
    const newBookList = [...books, newBook];
    setBooks(newBookList);
    resetForm();
    toggleFormHandler();
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    resetForm();
    toggleFormHandler();
  };

  const resetForm = () => {
    const initialForm = [...form];
    for (let item of initialForm) {
      item.value = "";
      item.checked = false;
    }
    setForm(initialForm);
  };

  const toggleRead = (id) => {
    const currBooks = [...books];
    const relIndex = currBooks.findIndex((item) => item.id === id);
    currBooks[relIndex].read = !currBooks[relIndex].read;
    setBooks(currBooks);
  };

  const deleteBookHandler = (id) => {
    const currBooks = [...books];
    const relIndex = currBooks.findIndex((item) => item.id === id);
    currBooks.splice(relIndex, 1);
    setBooks(currBooks);
  };

  return (
    <div className="App">
      <Title title="The Library" />
      <Bookshelf
        bookList={books}
        toggleRead={toggleRead}
        deleteBook={deleteBookHandler}
      />
      <Button
        clicked={toggleFormHandler}
        show={showForm}
        buttonText="New Book"
      />
      {showForm ? (
        <NewBookForm
          form={form}
          handleInput={inputHandler}
          submit={submitHandler}
          cancel={cancelHandler}
        />
      ) : null}
    </div>
  );
};

export default App;
