const knex = require("../database/knex");
class notesRepository {
  async create(title, description, user_id, tags, links) {
    const [note_id] = await knex("notes").insert({
      title,
      description,
      user_id,
    });
    const linksInsert = links.map((link) => {
      return {
        note_id,
        url: link,
      };
    });
    await knex("links").insert(linksInsert);

    const tagsInsert = tags.map((name) => {
      return {
        note_id,
        name,
        user_id,
      };
    });

    const insetTags = await knex("tags").insert(tagsInsert);
    return insetTags;
  }

  async show(id) {
    const note = await knex("notes").where({ id }).first();
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    const links = await knex("links")
      .where({ note_id: id })
      .orderBy("created_at");

      return ({
        ...note,
        tags,
        links
      })
  }

  async delete(id) {
    await knex("notes").where({ id }).delete();
  }

  async index({ title, tags, user_id }) {
    let notes;
    if (tags) {
      const filterTags = tags.split(",").map((tag) => tag.trim());

      notes = await knex("tags")
        .select(["notes.id", "notes.title", "notes.user_id"])
        .where("notes.user_id", user_id)
        .whereLike("notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("notes", "notes.id", "tags.note_id")
        .groupBy("notes.id")
        .orderBy("notes.title");
    } else {
      notes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    const userTags = await knex("tags").where({ user_id });
    const notesWithTags = notes.map((note) => {
      const notesTags = userTags.filter((tag) => tag.note_id === note.id);
      return {
        ...note,
        tags: notesTags,
      };
    });

    return notesWithTags;
  }
}

module.exports = notesRepository;
