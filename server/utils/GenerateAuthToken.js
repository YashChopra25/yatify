import jwt from "jsonwebtoken";
export const GenerateAuthToken = (userData) => {
  const token = jwt.sign(userData, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

export const decodeToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
