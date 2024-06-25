class NotesRepositoryInMemory {
  constructor() {
    this.notes = [];
  }
  async create(title, description, user_id, tags, links) {
    const note = {
      user_id,
      title,
      description,
      tags,
      links,
    };
    this.notes.push(note);
    return note;
  }

  async show(user_id) {
    const searchNoteById = this.notes.filter(
      (note) => note.user_id === user_id
    );

    if (searchNoteById.length === 0) {
      return;
    }

    return searchNoteById;
  }

  async delete(id) {
    const index = this.notes.findIndex((note) => note.user_id === id);
    if (index !== -1) {
      this.notes.splice(index, 1);
    }
    const checkId = this.notes.some((note) => note.user_id === id);
    return checkId;
  }

  async index(title, tags, user_id) {
    const searchNoteById = this.notes.filter(
      (note) => note.user_id === user_id
    );

    let filterNote;

    if (tags && tags.length > 0) {
      const filterTags = await tags.flatMap((tag) => {
        return searchNoteById.filter((note) => {
          return note.tags.includes(tag);
        });
      });
      //pesquisar depois
      let uniqueNote = filterTags.filter(
        (value, index, array) =>
          array.findIndex(
            (t) => JSON.stringify(t) === JSON.stringify(value)
          ) === index
      );
      filterNote = uniqueNote;
    } else {
      filterNote = searchNoteById;
    }

    if (title && title.length > 0) {
      const filterTitle = await filterNote.filter((note) => {
        return note.title.includes(title);
      });

      filterNote = filterTitle;
    }
    return filterNote;
  }
}

module.exports = NotesRepositoryInMemory;
