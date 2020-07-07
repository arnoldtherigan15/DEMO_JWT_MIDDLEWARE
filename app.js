const express = require("express");
const app = express();
const PORT = 3000;
const router = require("./routes");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(router);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
