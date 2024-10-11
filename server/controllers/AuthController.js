const login = (req, res) => {
  res.send("login");
};
const register = (req, res) => {
  res.send("register");
};
const forgotPassword = (req, res) => {
  res.send("forgotPassword");
};
const resetPassword = (req, res) => {
  res.send("resetPassword");
};
const changePassword = (req, res) => {
  res.send("changePassword");
};

export { login, register, forgotPassword, resetPassword, changePassword };
