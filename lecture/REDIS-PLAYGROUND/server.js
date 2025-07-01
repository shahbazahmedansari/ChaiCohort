const express = require("express");
const axios = require("axios");
const client = require("./client.js");

const app = express();

app.get("/", async (req, res) => {

  const cacheValue = await client.get('todos');

  if (cacheValue) return res.json(JSON.parse(cacheValue));

  const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos");
  console.log(data);
  await client.set('todos', JSON.stringify(data));
  await client.expire('todos', 30);
  return res.json(data);
});

app.listen(9000);