require('express-async-errors')
const express = require("express");
const routes = require("./routes");
const AppError = require('./utils/appError');
const database = require('./database/sqlite');



const app = express();
app.use(express.json())

const PORT = 3333;

app.use(routes)

database()

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }
  console.log(error);

  return res.status(500).json({
    status: 'error',
    message: 'internal server error'
  })
})
// app.get("/message/:id/:user", (req, res) => {
//   const { id, user } = req.params;
//   res.send(`id da mensagem: ${id}.
//     Usuário: ${user}`);
// });

// app.get('/users', (req, res) => {
//   const {page, limit, name} = req.query

//   res.send(`Página: ${page}. Mostrar: ${limit}. Nome: ${name}`)
// })

app.listen(PORT, () => {
  console.log(`Esta executando na porta: ${PORT}`);
});

