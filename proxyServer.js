var express = require("express");
var cors = require("cors");
const axios = require("axios");

var app = express();

app.use(cors());

const API_KEY = "RGAPI-bf995761-6cad-4c75-a736-659661ec46c9";

function getPlayerPUUID(playerName, tag) {
  return axios
    .get(
      "https://asia.api.riotgames.com" +
        "/riot/account/v1/accounts/by-riot-id/" +
        playerName +
        "/" +
        tag +
        "?api_key=" +
        API_KEY
    )
    .then((res) => {
      console.log(res);
      return res.data.puuid;
    })
    .catch((err) => err);
}

app.get("/", (req, res) => {
  const playerName = "심기건들면던진다";
  const tag = "yun";
  getPlayerPUUID(playerName, tag)
    .then((PUUID) => {
      console.log(PUUID);
      res.send(`
        <html>
          <body>
            <h1>Player PUUID</h1>
            <p>${playerName}</p>
            <p>${PUUID}</p>
          </body>
        </html>
      `);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

app.listen(4000, function () {
  console.log("Server Start");
});
