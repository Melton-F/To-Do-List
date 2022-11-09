import User from "../userModel/userModel";
import crypto from "crypto";
import bcrypt from "bcrypt";
import sendMail from "../../utils/sendMail";
import jwt from 'jsonwebtoken'

exports.showUsers = (req, res) => {
  User.find()
    .then((users) => {
      if (users < 1) {
        return res.status(404).json({
          status: "Fail",
          message: "There is no users",
        });
      }
      res.status(200).json({
        status: "Success",
        message: "All the users showed",
        no_Of_Users: users.length,
        users: users,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Fail",
        error: err,
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

exports.register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (error, hash) => {
    if (error) {
      res.status(500).json({
        error: error,
      });
    } else {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hash
      });
      let otp = parseInt(Math.random() * 1000000);
      // console.log(otp)
      user.otp = otp;
      user
        .save()
        .then(async (response) => {
          const forMail = await User.findOne({ email: req.body.email });
          console.log(forMail);
          sendMail({
            email: forMail.email,
            subject: "OTP from nodeMailer",
            message: `your otp for to do list app is ${forMail.otp}`,
          });
          //user.save() used to save it in the database
          res.status(201).json({
            message: "user created successfully",
            userData: response,
          });
        })
        .catch((e) => {
          res.send(e);
        });
    }
  });
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        bcrypt.compare(
          req.body.password,
          user.password,
          async (err, result) => {
            //this method will compare the db password and the password we enter while login to verify
            //   console.log(user);
            if (err) {
              return res.status(401).json({
                message: "Auth failed",
              });
            }

            const otpVerify = await User.findOne({ otp: req.body.otp });
            console.log(otpVerify);
            if (result && otpVerify) {
              const payloadData = {
                userMail: user.email,
                userId: user._id,
              };

              //token creation started if password comparission is success
              const token = jwt.sign(payloadData, "secretMessage", {
                expiresIn: "3h",
              });

              return res.status(200).json({
                message: "Auth Successful",
                the_token: "Bearer" + " " + token,
              });
            }
            res.status(401).json({
              message: "Auth failed",
            });
          }
        );
      } else {
        res.status(404).json({
          message: "user not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json({
          status: "Fail",
          message: "User not Found",
        });
      }
      res.status(200).json({
        status: "Success",
        user,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Fail",
        error: err,
      });
    });
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((doc) => {
      res.status(200).json({
        status: "Success",
        message: "user updated",
        updatedUser: doc,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "fail",
        error: err,
      });
    });
};

exports.deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .exec()
    .then((result) => {
      res.status(204).json({
        status: "Success",
        message: "user deleted successfully",
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Fail",
        error: err,
      });
    });
};
