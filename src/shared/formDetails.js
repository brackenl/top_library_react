const formDetails = [
  {
    label: "Title:",
    type: "text",
    value: "",
    id: "book-title",
    validity: {
      minLength: 2,
    },
  },
  {
    label: "Author:",
    type: "text",
    value: "",
    id: "book-author",
  },
  {
    label: "Number of Pages:",
    type: "number",
    value: "",
    id: "book-pages",
  },
  {
    label: "Have you read it?",
    type: "checkbox",
    checked: false,
    id: "read",
  },
];

export default formDetails;
