class NoteDeleteService {
  constructor(notesRepository) {
    this.notesRepository = notesRepository;
  }

  async execute(id) {
    return this.notesRepository.delete(id);
  }
}

module.exports = NoteDeleteService;
