const authMiddleware = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};

export default {authMiddleware}