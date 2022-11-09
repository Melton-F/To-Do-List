"use strict";

var _nodemailer = require("nodemailer");

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sendEmail = async function sendEmail(options) {
  console.log("email function");
  console.log(options.email);
  console.log(options.message);
  var transporter = _nodemailer2.default.createTransport({
    service: "gmail",
    auth: {
      user: "meltonmeni619@gmail.com",
      pass: "bdit nzzl aaeo rkbh"
    }
  });

  var mailOptions = {
    from: "meltonmeni619@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  await transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log("err");
    }
  });
};

module.exports = sendEmail;