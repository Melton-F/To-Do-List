'use strict';

var _console = require('console');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = new _mongoose2.default.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: Number },
    password: { type: String },
    otp: { type: Number }
}, { timestamps: true });

var User = _mongoose2.default.model("User", userSchema);
module.exports = User;