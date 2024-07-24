const { Router } = require("express");
const TagsController = require("../controllers/tagsController");
const tagsRouter = Router();

const tagController = new TagsController();

tagsRouter.get('/:user_id', tagController.index)

module.exports = tagsRouter