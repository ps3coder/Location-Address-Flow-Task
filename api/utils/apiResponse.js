const apiResponse = {
  success: (res, data, message = "successful operation") => {
    res.status(200).json({
      success: true,
      message,
      data,
    });
  },
  error: (res, error, statusCode = 500) => {
    res.status(statusCode).json({
      success: false,
      message: error.message || "An error occurred",
    });
  },
};

export default apiResponse;
