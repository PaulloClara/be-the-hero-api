const express = require("express");

const server = express();

server.use(require("./routes"));

const PORT = 3000;

server.listen(PORT, _ => {
  console.log(`\n\tRunning on localhost:${PORT}\n`);
});
