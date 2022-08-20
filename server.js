const express = require("express");
const https = require("https");

// Authorization key for Ballchasing API Token
const fs = require("fs");
var key = fs.readFileSync("./key.txt").toString();

const app = express();

app.get("/", function(req, res){

    const options = {
        hostname: 'ballchasing.com',
        path: '/api/replays/69055622-3708-42ee-b222-964e432f3d67',
        headers: {
            Authorization: key
        }
    };

    https.get(options, function(response){

        console.log("Response statusCode: " + response.statusCode);

        let data = '';
        response.on("data", chunk => {
            data += chunk;
        });
        response.on("end", () =>{
            const apiData = JSON.parse(data);
            console.log(apiData);
            const player0Camera = apiData.blue.players[0].camera;
            res.send(player0Camera);
        })

        // console.log("Response statusCode: " + response.statusCode);

        // response.on("data", function(data){
        //     const apiData = JSON.parse(data);
        //     console.log(apiData);
        // })
    })

    // res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});