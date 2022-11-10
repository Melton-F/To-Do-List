import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    console.log("email function");
  // console.log(options.email);
  // console.log(options.message)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "meltonmeni619@gmail.com",
      pass: "bdit nzzl aaeo rkbh",
    },
  });

  const mailOptions = {
    from: "meltonmeni619@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("err");
    }
  });
};

module.exports = sendEmail;