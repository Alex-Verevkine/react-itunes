const axios = require("axios");
const ResponseMiddlewares = require("../Middlewares/Response.middlwares");
module.exports = class ItunesController {
  /**
   * @des Requests from DB 25 itunes music objects by provided search term.
   */
  async get(req, res, next) {
    try {
      const requestedData = await axios.get(
        `https://itunes.apple.com/search?term=${encodeURI(
          req.params.term
        )}&media=music&limit=25`
      );
      ResponseMiddlewares.sendResponseData(res, requestedData.data, next);
    } catch (error) {
      next(error);
    }
  }
};
