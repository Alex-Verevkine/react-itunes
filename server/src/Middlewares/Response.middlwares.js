module.exports = class ResponseMiddlewares {
  static sendResponse(res, status, message, data) {
    res.status(status).json({
      message,
      obj: data,
      responseMeta: res.locals.responseMeta
    });
  }

  static errorHandlerMiddleware(err, req, res, next) {
    console.error({ err }, "An error occured");
    this.sendResponse(
      res,
      err.status ? err.status : 500,
      err.message ? err.message : "Something went wrong!",
      err.data && process.env.SERVICE_ENV != "production" ? err.data : null
    );
  }
  /** Setting Response Data on the response obj and calls next function
   * @param  {} res res Object
   * @param  {} responseData Response Data
   * @param  {} next  Next function
   */
  static sendResponseData(res, responseData, next) {
    res.locals.responseObj = {
      status: 200,
      message: "Success",
      data: responseData
    };
    next();
  }

  static responseHandlerMiddlware(req, res, next) {
    try {
      this.sendResponse(
        res,
        res.locals.responseObj.status,
        res.locals.responseObj.message,
        res.locals.responseObj.data
      );
    } catch (error) {
      next({
        status: 500,
        message: "Something went wrong!",
        data: error
      });
    }
  }
};
