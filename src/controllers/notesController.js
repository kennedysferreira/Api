const knex = require("../database/knex");

class NotesController {
  async create(req, res) {
    const { title, description, tags, links } = req.body;
    const { user_id } = req.params;

    const [note_id] = await knex("notes").insert({
      title,
      description,
      user_id,
    });

    const linksInsert = links.map((link) => {
      return { url: link, note_id };
    });

    await knex("links").insert(linksInsert);

    const tagsInsert = tags.map((name) => {
      return { name, note_id, user_id };
    });

    await knex("tags").insert(tagsInsert);

    res.json({ message: "Note created successfully" });
  }

  async show(req, res) {
    const { id } = req.params;
    const note = await knex("notes").where({ id }).first();
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    const links = await knex("links")
      .where({ note_id: id })
      .orderBy("created_at");

    return res.json({ note, tags, links });
  }

  async delete(req, res) {
    const { id } = req.params;
    await knex("notes").where({ id }).delete();
    return res.json({ message: "Note deleted successfully" });
  }

  async index(req, res) {
    const { user_id, title } = req.query;

    let notes;

    if (tags) {
      const filterTags = tags.split(",").map((tag) => tag.trim());
      notes = await knex("tags").whereIn("name", filterTags);
      return res.json(notes);
    }

    notes = await knex("notes")
      .where({ user_id })
      .whereLike("title", `%${title}%`)
      .orderBy("title");
    return res.json(notes);
  }
}

module.exports = NotesController;
