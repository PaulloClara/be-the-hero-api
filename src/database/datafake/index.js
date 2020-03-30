const request = require("request");
const { resolve } = require("path");
const { readFileSync: readFile } = require("fs");

const tokens = [];

function sendRequest(route, data, token) {
  return request(
    {
      url: `http://localhost:3000/${route}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    },
    (error, { body }) => {
      body = JSON.parse(body);
      tokens.push(body.token);
    }
  );
}

setTimeout(() => {
  const min = 0;
  const max = tokens.length;

  incidents.forEach(async incident => {
    const token = tokens[Math.floor(Math.random() * (max - min) + min)];
    await sendRequest("incidents", incident, token);
  });
}, 20000);

const ongs = JSON.parse(readFile(resolve(__dirname, "ongs.json")));
const incidents = JSON.parse(readFile(resolve(__dirname, "incidents.json")));

setTimeout(() => {
  ongs.forEach(async ong => {
    await sendRequest("ongs", ong);
  });
}, 6000);
