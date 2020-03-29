require("dotenv").config();

const express = require("express");
const server = express();

server.use(require("cors")());
server.use(express.json());
server.use(require("morgan")("tiny"));
server.use(require("./routes"));

const PORT = 3000;

server.listen(PORT, _ => {
  console.log(`\n\tRunning on localhost:${PORT}\n`);
});
