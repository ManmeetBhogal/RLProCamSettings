const express = require("express");
const axios = require("axios");

// Authorization key for Ballchasing API Token
const fs = require("fs");
var key = fs.readFileSync("./key.txt").toString();

const app = express();

app.get("/", function(req, res){

    const axiosInstance = axios.create({
        baseURL: "https://ballchasing.com/api"
      })

      axiosInstance.get('/replays/?uploader=76561199225615730', {
        headers: {
          Authorization: key
        }
      }).then(response => {
        data = response.data;
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });

    res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});