const express = require("express");
const cors = require("cors");

const routerApi = require("./routes/api/index");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", routerApi);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = app;
