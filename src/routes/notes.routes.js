const { Router } = require("express")

const NoteController = require("../controllers/notesController")
const notesRouter = Router()

const noteController = new NoteController();

notesRouter.post('/:user_id', noteController.create)

module.exports = notesRouter