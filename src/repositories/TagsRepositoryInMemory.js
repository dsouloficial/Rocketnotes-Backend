class TagsRepositoryInMemory {
  constructor() {
    this.tags = [];
  }

  async create({ name, note_id, user_id, id }) {
    const tags = {
      id,
      name,
      note_id,
      user_id,
    };
    this.tags.push(tags);
    return tags;
  }

  async show(user_id) {
    return this.tags.filter((tag) => tag.user_id === user_id);
  }
}

module.exports = TagsRepositoryInMemory;
