const AppError = require("../utils/appError");
const sqliteConnection = require("../database/sqlite");
const { hash, compare } = require("bcryptjs");

class UserController {
  async create(req, res) {
    const { name, email, password } = req.body;
    const database = await sqliteConnection();
    const checkUserExist = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (checkUserExist) {
      throw new AppError("Este email ja existe");
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return res.status(201).json();
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body;
    const { id } = req.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if (!user) {
      throw new AppError("Usuario nao existe");
    }

    const userWithUpdateEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError("este email ja esta em uso");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError("precisa informar a nova senha e a antiga");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      if (!checkOldPassword) {
        throw new AppError("Senha antiga esta incorreta");
      }
      user.password = await hash(password, 8);
    }

    await database.run(
      ` 
      UPDATE users SET 
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, id]
    );

    return res.json();
  }
}

module.exports = UserController;
