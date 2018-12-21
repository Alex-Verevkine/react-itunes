const { MediaController } = require("../Controllers");
const ResponseMiddlewares = require("../Middlewares/Response.middlwares");
module.exports = class MediaAPI {
  constructor() {
    this.mediaController = new MediaController();
  }
  /**
   * @des Get Itunes Media Items API.
   */
  async get(req, res, next) {
    try {
      const { term } = req.params;
      const requestedData = await this.mediaController.get(term);
      ResponseMiddlewares.sendResponseData(res, requestedData.data, next);
    } catch (error) {
      next(error);
    }
  }
};
