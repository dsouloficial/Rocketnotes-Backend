class NoteIndexService {
  constructor(notesRepository) {
    this.notesRepository = notesRepository;
  }

  async execute(title, tags, user_id) {
    const notes = await this.notesRepository.index(title, tags, user_id);
    return notes;
  }
}

module.exports = NoteIndexService;
