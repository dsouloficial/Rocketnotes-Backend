const TagsRepository = require("../repositories/TagsRepository");
const TagShowService = require("../services/tags/TagShowService");

class TagsController {
  async index(request, response) {
    const user_id = request.user.id;

    const tagsRepository = new TagsRepository();
    const tagsService = new TagShowService(tagsRepository);

    const tagsShowService = await tagsService.execute(user_id);

    return response.json(tagsShowService);
  }
}

module.exports = TagsController;
