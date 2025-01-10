const ErrorHandler = (err, req, res, next) => {
  console.error(err);
  try {
    const errorResponse = {
      AuthError: {
        errorType: "AuthError",
        message: err.message,
      },
      CustomError: {
        errorType: "CustomError",
        message: err.message,
      },
      ValidationError: {
        success: 400,
        errorType: "ValidationError",
        message: err.message,
        errors: Object.entries(err?.errors || {}).map(([field, error]) => ({
          field,
          message: error.message,
        })),
      },
      CastError: {
        success: 400,
        errorType: "CastError",
        message: "Invalid Format of the data",
      },
      JWTError: {
        errorType: "JWTError",
        message: err.message,
      },
      TokenExpiredError: {
        errorType: "JWTError",
        message: "Authorization failed, please login again.",
      },
      JsonWebTokenError: {
        errorType: "JWTError",
        message: "Invalid token",
      },
    };

    if (errorResponse[err.name]) {
      let { status, ...response } = errorResponse[err.name];

      if (!status) status = 400;

      return res.status(status).json({
        success: false,
        ...response,
        error: err.message,
      });
    }

    return res.status(500).json({
      success: false,
      errorType: "InternalError",
      message: "Internal server error",
      error: err.message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      errorType: "InternalError",
      message: "Internal server error",
      error: err.message,
    });
  }
};

const AllRouteHandler = (req, res) => {
  res.status(404).json({
    success: false,
    path: req.originalUrl,
    method: req.method,
    message: `The Route ${req.originalUrl} with ${req.method} method is not found`,
  });
};
export { ErrorHandler, AllRouteHandler };
