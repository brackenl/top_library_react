const formDetails = [
  {
    label: "Title:",
    type: "text",
    value: "",
    id: "book-title",
    validity: {
      minLength: 2,
    },
    valid: false,
    touched: false,
    errorMessage: "",
  },
  {
    label: "Author:",
    type: "text",
    value: "",
    id: "book-author",
    validity: {
      minLength: 2,
    },
    valid: false,
    touched: false,
    errorMessage: "",
  },
  {
    label: "Number of Pages:",
    type: "number",
    value: "",
    id: "book-pages",
    validity: {
      min: 1,
      max: 2000,
    },
    valid: false,
    touched: false,
    errorMessage: "",
  },
  {
    label: "Have you read it?",
    type: "checkbox",
    checked: false,
    id: "read",
    validity: {},
  },
];

export default formDetails;
