import validate from "validator";
const validateEmail = (email) => {
  return validate.isEmail(email);
};

export { validateEmail };
