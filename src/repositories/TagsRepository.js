const knex = require("../database/knex");

class TagsRepository {
  async show(user_id) {
    const tags = await knex("tags").where({ user_id }).groupBy("name");
    return tags;
  }
}

module.exports = TagsRepository;
