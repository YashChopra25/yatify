const ErrorHandler = (err, req, res, next) => {
  console.error(err);

  const errorResponse = {
    AuthError: {
      status: 401,
      errorType: "AuthError",
      message: err.message,
    },
    CustomError: {
      status: 401,
      errorType: "CustomError",
      message: err.message,
    },
    ValidationError: {
      status: 400,
      errorType: "ValidationError",
      message: err.message,
      errors: Object.entries(err?.errors || {}).map(([field, error]) => ({
        field,
        message: error.message,
      })),
    },
    CastError: {
      status: 400,
      errorType: "CastError",
      message: "Invalid Format of the data",
    },
    JWTError: {
      status: 401,
      errorType: "JWTError",
      message: err.message,
    },
    TokenExpiredError: {
      status: 401,
      errorType: "JWTError",
      message: "Authorization failed, please login again.",
    },
    JsonWebTokenError: {
      status: 401,
      errorType: "JWTError",
      message: "Invalid token",
    },
  };

  if (errorResponse[err.name]) {
    const { status, ...response } = errorResponse[err.name];
    return res.status(status).json({
      success: false,
      ...response,
      error: err.message,
    });
  }

  res.status(500).json({
    success: false,
    errorType: "InternalError",
    message: "Internal server error",
    error: err.message,
  });
};

const AllRouteHandler = (req, res) => {
  res.status(404).json({
    success: false,
    status: 404,
    path: req.originalUrl,
    method: req.method,
    message: `The Route ${req.originalUrl} with ${req.method} method is not found`,
  });
};
export { ErrorHandler, AllRouteHandler };
