import * as actionTypes from "../actions/actionTypes";
import updateObject from "../../util/updateObject";

const initialState = {
  books: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INITIALISE_BOOKSHELF_START:
      return updateObject(state, { loading: true });
    case actionTypes.INITIALISE_BOOKSHELF_SUCCESS:
      return updateObject(state, { books: action.books, loading: false });
    case actionTypes.INITIALISE_BOOKSHELF_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    default:
      return state;
  }
};

export default reducer;
