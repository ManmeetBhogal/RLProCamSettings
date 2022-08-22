const express = require("express");
const axios = require("axios");

// Authorization key for Ballchasing API Token
const fs = require("fs");
var key = fs.readFileSync("./key.txt").toString();

const app = express();

app.get("/", function(req, res) {
  callAndWrite(); // calling function on server

  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

const axiosInstance = axios.create({
  baseURL: "https://ballchasing.com/api/replays/?uploader=76561199225615730",
  // if a full URL is used in the axiosInstance.get call, it will overwrite the baseURL, as seen below
  headers: {
    Authorization: key
    // added authorization key header in global creation of axiosInstance, makes it so we don't
    // have to put the headers in each specific call. If the call is made with axiosInstance.get()
    // the headers will be automatically used :)
  }
})


const reqOne = "https://ballchasing.com/api/replays/?uploader=76561199225615730";

async function callAndWrite() {
  const timer = ms => new Promise(res => setTimeout(res, ms)); // created timer that makes it so
  // we can pause between API calls to avoid too many requests error (429)




  axiosInstance.get(reqOne).then(async response => {
    var responseOne = response.data;
    list = await responseOne.list;
    var done;

    teamArray = [];
    playerArray = [];

    for (value in list) {
      var team = list[value].blue;
      for (value in team) {
        var teamName = team.name;
        if (teamArray.includes(teamName)) {
          continue
        }
        teamArray.push(teamName);

        var teamPlayers = team.players;
        for (player in teamPlayers) {
          var playerName = teamPlayers[player].name;
          if (playerArray.includes(playerName)) {
            continue
          }
          playerArray.push(playerName);
          var playerID = teamPlayers[player].id;

          await console.log(teamName + "," + playerName + "," + playerID.platform + "," + playerID.id + "\n");
        }
      }
    };
  }).catch(err => {
    console.log(err);
  })

  await timer(600); // does nothing right now, but will be needed once we start looping API calls
}
