const sqliteConnection = require("..");
const creatUser = require("./creatUsers");


async function migrationRun() {
  const schemas = [creatUser].join("");

  sqliteConnection()
    .then((db) => db.exec(schemas))
    .catch((error) => console.error(error));
}

module.exports = migrationRun;
