import * as actionTypes from "./actionTypes";
import axios from "axios";

export const initialiseBookshelfStart = () => {
  return {
    type: actionTypes.INITIALISE_BOOKSHELF_START,
  };
};

export const initialiseBookshelfSuccess = (books) => {
  return {
    type: actionTypes.INITIALISE_BOOKSHELF_SUCCESS,
    books: books,
  };
};

export const initialiseBookshelfFailure = (error) => {
  return {
    type: actionTypes.INITIALISE_BOOKSHELF_FAIL,
    error: error.message,
  };
};

export const initialiseBookshelf = () => {
  console.log("initialise bookshelf");
  return (dispatch) => {
    console.log("inside dispatch");
    dispatch(initialiseBookshelfStart());
    axios
      .get("https://top-library-react.firebaseio.com/initialBooks.json")
      .then((response) => {
        const booksArr = [];
        for (let key in response.data) {
          booksArr.push({ ...response.data[key], key: key, id: key });
        }
        console.log("success", booksArr);
        dispatch(initialiseBookshelfSuccess(booksArr));
      })
      .catch((err) => {
        console.log(err);
        dispatch(initialiseBookshelfFailure(err));
      });
  };
};
