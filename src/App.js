import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import "./App.css";

import Title from "./components/Title/Title";
import Bookshelf from "./components/Bookshelf/Bookshelf";
import Button from "./components/Button/Button";
import NewBookForm from "./components/NewBookForm/NewBookForm";
// import initialBooks from "./shared/initialBooks";
import formDetails from "./shared/formDetails";
import { checkValidity } from "./util/validateForm";

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [books, setBooks] = useState(null);
  const [form, setForm] = useState([...formDetails]);
  const [loading, setLoading] = useState(true);

  const getBooks = useCallback(() => {
    setLoading(true);
    axios
      .get("https://top-library-react.firebaseio.com/initialBooks.json")
      .then((response) => {
        const booksArr = [];
        for (let key in response.data) {
          booksArr.push({ ...response.data[key], key: key, id: key });
        }
        setBooks(booksArr);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  const toggleFormHandler = () => {
    setShowForm(!showForm);
  };

  const inputHandler = (event) => {
    const newForm = form.slice();
    const relIndex = newForm.findIndex(
      (item) => item.label === event.target.id
    );
    newForm[relIndex].touched = true;
    if (event.target.type !== "checkbox") {
      newForm[relIndex].value = event.target.value;
    } else {
      newForm[relIndex].checked = event.target.checked;
    }
    checkValidity(
      newForm[relIndex].value,
      newForm[relIndex].validity,
      newForm[relIndex]
    )
      ? (newForm[relIndex].valid = true)
      : (newForm[relIndex].valid = false);
    setForm(newForm);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const currForm = [...form];
    if (currForm.filter((item) => item.valid === false).length > 0) {
      for (let item of currForm) {
        item.touched = true;
      }
      setForm(currForm);
      alert(
        "Please ensure that you have filled in the book's details correctly!"
      );
      return;
    }
    const newBook = {
      title: form[0].value,
      author: form[1].value,
      pages: form[2].value,
      read: form[3].checked,
      id: books.length + 1,
    };

    axios
      .post(
        "https://top-library-react.firebaseio.com/initialBooks.json",
        newBook
      )
      .then((response) => {
        getBooks();
        resetForm();
        toggleFormHandler();
      })
      .catch((err) => console.log(err));
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
      item.valid = false;
      item.touched = false;
    }
    setForm(initialForm);
  };

  const toggleRead = (key) => {
    const relIndex = books.findIndex((book) => book.key === key);
    axios
      .patch(
        `https://top-library-react.firebaseio.com/initialBooks/${key}.json`,
        { read: !books[relIndex].read }
      )
      .then((response) => getBooks())
      .catch((err) => console.log(err));

    /*
    const currBooks = [...books];
    const relIndex = currBooks.findIndex((item) => item.id === id);
    currBooks[relIndex].read = !currBooks[relIndex].read;
    setBooks(currBooks);
    */
  };

  const deleteBookHandler = (key) => {
    axios
      .delete(
        `https://top-library-react.firebaseio.com/initialBooks/${key}.json`
      )
      .then((response) => getBooks())
      .catch((err) => console.log(err));

    /*
    const currBooks = [...books];
    const relIndex = currBooks.findIndex((item) => item.id === id);
    currBooks.splice(relIndex, 1);
    setBooks(currBooks);
    */
  };

  return (
    <div className="App">
      <Title title="The Library" />
      <Bookshelf
        bookList={books}
        toggleRead={toggleRead}
        deleteBook={deleteBookHandler}
        loading={loading}
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
