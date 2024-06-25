const NotesRepositoryInMemory = require("../../repositories/NotesRepositoryInMemory");
const NoteShowService = require("./NoteShowService");

describe("NoteShowService", () => {
  let notesRepositoryInMemory = null;
  let noteShowService = null;

  beforeEach(() => {
    notesRepositoryInMemory = new NotesRepositoryInMemory();
    noteShowService = new NoteShowService(notesRepositoryInMemory);
  });

  it("Busca de nota", async () => {
    const note1 = {
      title: "Test1",
      description: "Test",
      user_id: 5,
      tags: ["tag1", "tag2"],
      links: ["link1", "link2"],
    };

    const note2 = {
      title: "Test2",
      description: "Test",
      user_id: 5,
      tags: ["tag3", "tag4"],
      links: ["link3", "link4"],
    };

    const note3 = {
      title: "Test3",
      description: "Test",
      user_id: 1,
      tags: ["tag5", "tag6"],
      links: ["tag5", "link6"],
    };

    await notesRepositoryInMemory.create(
      note1.title,
      note1.description,
      note1.user_id,
      note1.tags,
      note1.links
    );

    await notesRepositoryInMemory.create(
      note2.title,
      note2.description,
      note2.user_id,
      note2.tags,
      note2.links
    );

    await notesRepositoryInMemory.create(
      note3.title,
      note3.description,
      note3.user_id,
      note3.tags,
      note3.links
    );

    await expect(noteShowService.execute(5)).resolves.toBeTruthy();
    await expect(noteShowService.execute(1)).resolves.toBeTruthy();
    await expect(noteShowService.execute(2)).resolves.toBeFalsy();
  });
});
