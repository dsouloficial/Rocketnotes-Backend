const AppError = require("../../utils/AppError");
class NoteCreateService {
  constructor(notesRepository) {
    this.notesRepository = notesRepository;
  }

  async execute({ title, description, tags, links, user_id }) {
    if (!user_id) {
      throw new AppError("User not found");
    }
    return await this.notesRepository.create(
      title,
      description,
      user_id,
      tags,
      links
    );
  }
}

module.exports = NoteCreateService;
