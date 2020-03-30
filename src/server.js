require("dotenv").config();

const express = require("express");
const server = express();

server.use(require("cors")());
server.use(express.json());
server.use(require("morgan")("tiny"));
server.use(require("./routes"));
server.use(require("celebrate").errors());

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`\n\tRunning on localhost:${PORT}\n`);
});
