"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _app = require("./app");

var _app2 = _interopRequireDefault(_app);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//mongoose connection

// ("dotenv").config();
_mongoose2.default.connect("mongodb://localhost:27017/To-Do-List-APP");
_mongoose2.default.connection.once("open", function () {
  console.log("DB connected");
}).on("error", function (error) {
  console.log("error is:", error);
});

var PORT = process.env.PORT || 8080;
var server = _http2.default.createServer(_app2.default);
server.listen(PORT, function (req, res) {
  console.log("its running on port: " + PORT);
});