const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const { ConexionDB } = require("./database/config");

const app = express();
ConexionDB();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("Public"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log("Hola mudno");
});
