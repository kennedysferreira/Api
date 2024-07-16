const { Router } = require("express")
const UserController = require("../controllers/usersController")
const usersRouter = Router()

const userController = new UserController();

usersRouter.post('/', userController.create)

module.exports = usersRouter