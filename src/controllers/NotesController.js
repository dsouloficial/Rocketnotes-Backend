const NotesRepository = require("../repositories/NotesRepository");

const NoteCreateService = require("../services/notes/NoteCreateService");
const NoteShowService = require("../services/notes/NoteShowService");
const NoteDeleteService = require("../services/notes/NoteDeleteService");
const NoteIndexService = require("../services/notes/NoteIndexService");

class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const user_id = request.user.id;

    const notesRepository = new NotesRepository();
    const noteCreateService = new NoteCreateService(notesRepository);
    await noteCreateService.execute({
      title,
      description,
      tags,
      links,
      user_id,
    });

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;
    const notesRepository = new NotesRepository();
    const noteShowService = new NoteShowService(notesRepository);
    const note = await noteShowService.execute(id);
    return response.json(note);
  }

  async delete(request, response) {
    const { id } = request.params;
    const notesRepository = new NotesRepository();
    const noteDeleteService = new NoteDeleteService(notesRepository);
    await noteDeleteService.execute(id);
    return response.json();
  }

  async index(request, response) {
    const { title, tags } = request.query;
    const user_id = request.user.id;

    const notesRepository = new NotesRepository();
    const noteIndexService = new NoteIndexService(notesRepository);
    const notesWithTags = await noteIndexService.execute({
      title, tags, user_id
    })

    return response.json(notesWithTags);
  }
}

module.exports = NotesController;
