const NotesRepositoryInMemory = require("../../repositories/NotesRepositoryInMemory");
const NoteDeleteService = require("./NoteDeleteService");

describe("NoteDeleteService", () => {
  let notesRepositoryInMemory = null;
  let noteDeleteService = null;

  beforeEach(() => {
    notesRepositoryInMemory = new NotesRepositoryInMemory();
    noteDeleteService = new NoteDeleteService(notesRepositoryInMemory);
  });

  it("Deletando uma Nota", async () => {
    const note = {
      title: "Test",
      description: "Test",
      user_id: Math.floor(Math.random() * 1000) + 1,
      tags: ["tag1", "tag2"],
      links: ["link1", "link2"],
    };

    const noteCreate = await notesRepositoryInMemory.create(
      note.title,
      note.description,
      note.user_id,
      note.tags,
      note.links
    );

    const id = await noteCreate.user_id;
    const noteDelete = await noteDeleteService.execute(id);
    await expect(noteDelete).toBeFalsy();
  });
});
