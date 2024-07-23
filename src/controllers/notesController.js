const knex = require("../database/knex");

class NotesController {
  async create(req, res) {
    const { title, description, tags, links } = req.body;
    const { user_id } = req.params;

    const note_id = await knex("notes").insert({ title, description, user_id });

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
}

module.exports = { NotesController };
