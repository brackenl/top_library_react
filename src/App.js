import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import "./App.css";

import Title from "./components/Title/Title";
import Bookshelf from "./components/Bookshelf/Bookshelf";
import Button from "./components/Button/Button";
import NewBookForm from "./components/NewBookForm/NewBookForm";
import formDetails from "./shared/formDetails";
import { checkValidity } from "./util/validateForm";
import * as actions from "./store/actions/actions";

const App = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState([...formDetails]);

  const initialise = props.onInitialiseBookshelf;

  useEffect(() => {
    props.onInitialiseBookshelf();
  }, [initialise]);

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
      id: props.books.length + 1,
    };

    axios
      .post(
        "https://top-library-react.firebaseio.com/initialBooks.json",
        newBook
      )
      .then((response) => {
        props.onInitialiseBookshelf();
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
    const relIndex = props.books.findIndex((book) => book.key === key);
    axios
      .patch(
        `https://top-library-react.firebaseio.com/initialBooks/${key}.json`,
        { read: !props.books[relIndex].read }
      )
      .then((response) => props.onInitialiseBookshelf())
      .catch((err) => console.log(err));
  };

  const deleteBookHandler = (key) => {
    axios
      .delete(
        `https://top-library-react.firebaseio.com/initialBooks/${key}.json`
      )
      .then((response) => props.onInitialiseBookshelf())
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <Title title="The Library" />
      <Bookshelf
        bookList={props.books}
        toggleRead={toggleRead}
        deleteBook={deleteBookHandler}
        loading={props.loading}
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

const mapStateToProps = (state) => {
  console.log(state);
  return {
    books: state.books,
    loading: state.loading,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitialiseBookshelf: () => dispatch(actions.initialiseBookshelf()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
