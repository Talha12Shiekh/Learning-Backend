const https = require("https");

const server = https.createServer((req, res) => {
  console.log("Server started");
  res.end("Hello");
});

server.listen(8080);
