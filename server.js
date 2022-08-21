const express = require("express");
const axios = require("axios");

// Authorization key for Ballchasing API Token
const fs = require("fs");
var key = fs.readFileSync("./key.txt").toString();

const app = express();

app.get("/", function(req, res) {

  const axiosInstance = axios.create({
    baseURL: "https://ballchasing.com/api"
  })

  axiosInstance.get('/replays/?uploader=76561199225615730', {
      headers: {
        Authorization: key
      }
    }).then(response => {
      data = response.data;
      list = data.list;
      for (value in list) {
        var blueTeam = list[value].blue;
        for (value in blueTeam) {
          var blueName = blueTeam.name;
          var bluePlayers = blueTeam.players;
          console.log(blueName + "\n");
          for (player in bluePlayers) {
            var playerName = bluePlayers[player].name;
            var playerID = bluePlayers[player].id;
            console.log(playerName + "\n");
            console.log(playerID.platform);
            console.log(playerID.id + "\n");
          }
          console.log("\n");
        }
      }
    })
    .catch(error => {
      console.log(error);
    });

  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});