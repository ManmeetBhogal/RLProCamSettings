const express = require("express");
const axios = require("axios");

// Authorization key for Ballchasing API Token
const fs = require("fs");
var key = fs.readFileSync("./key.txt").toString();

const app = express();
app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get("/", function(req, res) {

  callAndWrite(); // calling function on server

  // Render home.ejs
  res.render("home");
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

async function callAndWrite() {

    const reqOne = "https://ballchasing.com/api/replays/?uploader=76561199225615730";
    const timer = ms => new Promise(res => setTimeout(res, ms)); // created timer that makes it so
    // we can pause between API calls to avoid too many requests error (429)

    axiosInstance.get(reqOne).then(async response => {
        var responseOne = response.data;
        list = await responseOne.list;

        teamArray = [];
        playerArray = [];

        for (value in list) {
          var blueTeam = list[value].blue;
          var orangeTeam = list[value].orange;
          for (value in blueTeam) {
            var blueTeamName = blueTeam.name;
            if (teamArray.includes(blueTeamName)) {
              continue
            }
            teamArray.push(blueTeamName);

            var blueTeamPlayers = blueTeam.players;
            for (player in blueTeamPlayers) {
              var bluePlayerName = blueTeamPlayers[player].name;
              if (playerArray.includes(bluePlayerName)) {
                continue
              }
              playerArray.push(bluePlayerName);
            var bluePlayerID = blueTeamPlayers[player].id;

            await console.log(blueTeamName + "," + bluePlayerName + "," + bluePlayerID.platform + "," + bluePlayerID.id + "\n");
          }
            for (value in orangeTeam) {
              var orangeTeamName = orangeTeam.name;
              if (teamArray.includes(orangeTeamName)) {
                continue
              }
              teamArray.push(orangeTeamName);

              var orangeTeamPlayers = orangeTeam.players;
              for (player in orangeTeamPlayers) {
                var orangePlayerName = orangeTeamPlayers[player].name;
                if (playerArray.includes(orangePlayerName)) {
                  continue
                }
                playerArray.push(orangePlayerName);
                var orangePlayerID = orangeTeamPlayers[player].id;

                await console.log(orangeTeamName + "," + orangePlayerName + "," + orangePlayerID.platform + "," + orangePlayerID.id + "\n");
              }
            }
            }
          };
        }).catch(err => {
        console.log(err);
      })

      await timer(600); // does nothing right now, but will be needed once we start looping API calls
    }

    app.listen(3000, function() {
      console.log("Server started on port 3000");
    });