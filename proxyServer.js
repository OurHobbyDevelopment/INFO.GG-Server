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
} ///riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${process.env.NEXT_PUBLIC_API_KEY}

app.get("/past5Games", async (req, res) => {
  const playerName = "심기건들면던진다";
  const tag = "yun";
  //   const PUUID = await getPlayerPUUID(playerName);
  getPlayerPUUID(playerName, tag);
});

app.listen(4000, function () {
  console.log("Server Start");
});
