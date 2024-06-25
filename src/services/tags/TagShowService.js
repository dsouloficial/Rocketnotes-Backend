class TagShowService {
  constructor(tagsRepository) {
    this.tagsRepository = tagsRepository;
  }

  async execute(user_id) {
    const showTags = await this.tagsRepository.show(user_id);
    return showTags;
  }
}

module.exports = TagShowService;
