"use strict";

var _userModel = require("../userModel/userModel");

var _userModel2 = _interopRequireDefault(_userModel);

var _crypto = require("crypto");

var _crypto2 = _interopRequireDefault(_crypto);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _sendMail = require("../../utils/sendMail");

var _sendMail2 = _interopRequireDefault(_sendMail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.showUsers = function (req, res) {
  _userModel2.default.find().then(function (users) {
    if (users < 1) {
      return res.status(404).json({
        status: "Fail",
        message: "There is no users"
      });
    }
    res.status(200).json({
      status: "Success",
      message: "All the users showed",
      no_Of_Users: users.length,
      users: users
    });
  }).catch(function (err) {
    res.status(400).json({
      status: "Fail",
      error: err
    });
  });
};

// exports.register = (req, res)=>{
//     const user = new User({
// name:req.body.name,
// email:req.body.email,
// phone:req.body.phone,
//         password:req.body.password
//     })

// const otp = crypto.randomInt(1000, 9999);
// // console.log(otp)
// user.otp = otp

//     user.save().then((doc)=>{
//         res.status(201).json({
//             status:"Success",
//             message:"user created",
//             createdUser:{
//                 name:doc.name,
//                 age:doc.age,
//                 email:doc.email,
//                 phone:doc.phone
//             }
//         })
//     })
//     .catch(err=>{
//         res.status(400).json({
//             status:"Fail",
//             error:err
//         })
//     })
// }

exports.register = function (req, res, next) {
  _bcrypt2.default.hash(req.body.password, 10, function (error, hash) {
    if (error) {
      res.status(500).json({
        error: error
      });
    } else {
      var user = new _userModel2.default({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hash
      });
      var otp = parseInt(Math.random() * 1000000);
      // console.log(otp)
      user.otp = otp;
      user.save().then(async function (response) {
        var forMail = await _userModel2.default.findOne({ email: req.body.email });
        console.log(forMail);
        (0, _sendMail2.default)({
          email: forMail.email,
          subject: "OTP from nodeMailer",
          message: "your otp for to do list app is " + forMail.otp
        });
        //user.save() used to save it in the database
        res.status(201).json({
          message: "user created successfully",
          userData: response
        });
      }).catch(function (e) {
        res.send(e);
      });
    }
  });
};

exports.login = function (req, res, next) {
  _userModel2.default.findOne({ email: req.body.email }).then(function (user) {
    if (user) {
      _bcrypt2.default.compare(req.body.password, user.password, async function (err, result) {
        //this method will compare the db password and the password we enter while login to verify
        //   console.log(user);
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }

        var otpVerify = await _userModel2.default.findOne({ otp: req.body.otp });
        console.log(otpVerify);
        if (result && otpVerify) {
          var payloadData = {
            userMail: user.email,
            userId: user._id
          };

          //token creation started if password comparission is success
          var token = jwt.sign(payloadData, "secretMessage", {
            expiresIn: "3h"
          });

          return res.status(200).json({
            message: "Auth Successful",
            the_token: "Bearer" + " " + token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    } else {
      res.status(404).json({
        message: "user not found"
      });
    }
  }).catch(function (err) {
    res.status(500).json({
      error: err
    });
  });
};

exports.getUserById = function (req, res) {
  _userModel2.default.findById(req.params.id).then(function (user) {
    if (!user) {
      res.status(404).json({
        status: "Fail",
        message: "User not Found"
      });
    }
    res.status(200).json({
      status: "Success",
      user: user
    });
  }).catch(function (err) {
    res.status(400).json({
      status: "Fail",
      error: err
    });
  });
};

exports.updateUser = function (req, res) {
  _userModel2.default.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(function (doc) {
    res.status(200).json({
      status: "Success",
      message: "user updated",
      updatedUser: doc
    });
  }).catch(function (err) {
    res.status(400).json({
      status: "fail",
      error: err
    });
  });
};

exports.deleteUser = function (req, res) {
  _userModel2.default.deleteOne({ _id: req.params.id }).exec().then(function (result) {
    res.status(204).json({
      status: "Success",
      message: "user deleted successfully"
    });
  }).catch(function (err) {
    res.status(400).json({
      status: "Fail",
      error: err
    });
  });
};