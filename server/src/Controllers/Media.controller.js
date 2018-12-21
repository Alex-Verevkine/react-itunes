const axios = require("axios");
const ResponseMiddlewares = require("../Middlewares/Response.middlwares");
module.exports = class ItunesController {
  /**
   * @des Requests from DB 25 itunes music objects by provided search term.
   */
  get(term) {
    return axios.get(
      `https://itunes.apple.com/search?term=${encodeURI(
        term
      )}&media=music&limit=25`
    );
  }
};
