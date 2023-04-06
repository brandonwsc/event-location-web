const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const { mountRouter } = require("./router");

const app = express();
const server = http.createServer(app);

// expose these paths to public access
const publicPath = path.join(__dirname, "public");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(publicPath));

mountRouter(app);

const BACKEND_PORT = 1337;
const BACKEND_HOSTNAME = "0.0.0.0";

server.listen(BACKEND_PORT, BACKEND_HOSTNAME, () => {
  console.log(
    `[PROCESS] Server is listening on port:${BACKEND_PORT} with host name:${BACKEND_HOSTNAME}`
  );
});

module.exports = {
  app,
  server,
};
