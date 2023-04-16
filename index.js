const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

require("dotenv").config();

app.post("/sendEmail", (req, res) => {
  const { email, html, subject } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `sethi.aryan0101@gmail.com`,
    to: `${email}`,
    subject: `${subject}`,
    html: html,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).json({
        message: "Error in sending mail",
      });
    } else {
      res.status(200).json({
        message: "Email sent Successfully",
      });
    }
  });
});
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
