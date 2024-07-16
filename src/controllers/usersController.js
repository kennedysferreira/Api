const AppError = require("../utils/appError");

class UserController {
  create(req, res) {
    const { name, email, password } = req.body;

    if (!name) {
      throw new AppError('nome obrigatorio')
    }
    res.status(201).json({ name, email, password });
  }
}

module.exports = UserController;
