const NotesRepositoryInMemory = require("../../repositories/NotesRepositoryInMemory");
const NoteCreateService = require("./NoteCreateService");
const AppError = require("../../utils/AppError");

describe("NoteCreateService", () => {
  let notesRepositoryInMemory = null;
  let noteCreateService = null;

  beforeEach(() => {
    notesRepositoryInMemory = new NotesRepositoryInMemory();
    noteCreateService = new NoteCreateService(notesRepositoryInMemory);
  });

  it("Criação de uma nota", async () => {
    const note = {
      title: "Test",
      description: "Test",
      user_id: Math.floor(Math.random() * 1000) + 1,
      tags: ["tag1", "tag2"],
      links: ["link1", "link2"],
    };
    const noteCreate = await noteCreateService.execute(note);

    await expect(noteCreate).toEqual(note);
  });

  it("Criação de uma nota sem usuário", async () => {
    const note = {
      title: "Test",
      description: "Test",
      tags: ["tag1", "tag2"],
      links: ["link1", "link2"],
    };

    await expect(noteCreateService.execute(note)).rejects.toEqual(
      new AppError("User not found")
    );
  });
});
