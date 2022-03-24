"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Auth = _interopRequireDefault(require("./Routers/Auth"));

var _dbConn = _interopRequireDefault(require("./dbConn"));

var _blog = _interopRequireDefault(require("./Routers/blog"));

var _cors = _interopRequireDefault(require("cors"));

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = process.env.PORT || 4000; // Connect to MongoDB

(0, _dbConn["default"])();

_mongoose["default"].connection.once('open', function () {
  console.log('Connected to MongoDB');
  app.listen(port, function () {
    return console.log("Server running on port ".concat(port));
  });
}); //swagger definition


var swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for My Blog Articles",
    version: "1.0.0"
  },
  servers: [{
    url: "http://localhost:4000",
    description: "Development server"
  }]
};
var options = {
  swaggerDefinition: swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./Routers/blog.js"]
};
var swaggerSpec = (0, _swaggerJsdoc["default"])(options); // middleware 

app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_bodyParser["default"].json());
app.use('/api/user', _Auth["default"]);
app.use('/api/blog', _blog["default"]);
app.use("/docs", _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(swaggerSpec));
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=index.js.map