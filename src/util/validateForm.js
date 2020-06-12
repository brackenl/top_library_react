export const checkValidity = (value, rules, obj) => {
  let isValid = true;

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }
  if (!isValid) {
    obj.errorMessage = "This field is required";
    return false;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  if (!isValid) {
    obj.errorMessage = `This field must be at least ${rules.minLength} characters`;
    return false;
  }

  if (rules.min) {
    isValid = value >= rules.min && isValid;
  }
  if (!isValid) {
    obj.errorMessage = `The book must be at least ${rules.min} pages long`;
    return false;
  }

  if (rules.max) {
    isValid = value <= rules.max && isValid;
  }
  if (!isValid) {
    obj.errorMessage = `The book must be no more than ${rules.max} pages long`;
    return false;
  }

  if (isValid) {
    obj.errorMessage = "";
  }

  return isValid;
};
