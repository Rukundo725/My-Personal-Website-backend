"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _Auth = _interopRequireDefault(require("../src/Routers/Auth"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dbConn = _interopRequireDefault(require("../src/dbConn"));

var _blog = _interopRequireDefault(require("../src/Routers/blog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); // Connect to MongoDB

(0, _dbConn["default"])(); // middleware 

app.use(_express["default"].json());
app.use(_bodyParser["default"].json());
app.use('/api/user', _Auth["default"]);
app.use('/api/blog', _blog["default"]);
var port = process.env.PORT || 4000; // Connect to MongoDB

(0, _dbConn["default"])();

_mongoose["default"].connection.once('open', function () {
  console.log('Connected to MongoDB');
  app.listen(port, function () {
    return console.log("Server running on port ".concat(port));
  });
});

var _default = app;
exports["default"] = _default;