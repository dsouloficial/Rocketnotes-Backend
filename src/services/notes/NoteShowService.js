class NoteShowService {
  constructor(notesRepository) {
    this.notesRepository = notesRepository;
  }

  async execute(id) {
    const note = await this.notesRepository.show(id);
    return note;
  }
}

module.exports = NoteShowService;
