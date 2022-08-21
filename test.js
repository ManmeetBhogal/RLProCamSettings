const axios = require("axios");

const fs = require("fs");
var key = fs.readFileSync("./key.txt").toString();

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