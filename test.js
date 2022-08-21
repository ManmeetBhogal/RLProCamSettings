const axios = require("axios");

const fs = require("fs");
var key = fs.readFileSync("./key.txt").toString();

axios.get('https://ballchasing.com/api/replays/?uploader=76561199225615730', {
  headers: {
    Authorization: key
  }
}).then(response => {
      data = response.data.id;
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
