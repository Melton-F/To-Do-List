"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _userRouter = require("./user/userRouter/userRouter");

var _userRouter2 = _interopRequireDefault(_userRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.json());
app.use((0, _morgan2.default)("dev"));

app.use('/api/user', _userRouter2.default);

module.exports = app;