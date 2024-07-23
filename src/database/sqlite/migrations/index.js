const sqliteConnection = require("..");
const createUser = require("./createUsers");


async function migrationRun() {
  const schemas = [createUser].join("");

  sqliteConnection()
    .then((db) => db.exec(schemas))
    .catch((error) => console.error(error));
}

module.exports = migrationRun;
