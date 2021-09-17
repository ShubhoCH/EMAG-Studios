const express = require("express");
const path = require("path");
const hbs = require("hbs");
const nodemailer = require("nodemailer");
// require("dotenv").config();
const port =  process.env.PORT_PROD;

const app = express();
// app.use(express.static(__dirname + 'public'))
app.use("/style", express.static(path.join(__dirname, "public/style")));
app.use("/script", express.static(path.join(__dirname, "public/script")));
app.use("/image", express.static(path.join(__dirname, "public/image")));

//setting path
const publicDirectoryPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../views/partials");
const viewsPath = path.join(__dirname, "../views");
const adsPath = path.join(__dirname, "../ads");
const policy = path.join(__dirname, "../policy");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(adsPath));
app.use(express.static(policy));
app.use(express.static(publicDirectoryPath));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/app-ads.txt", (req, res) => {
  res.render("app-ads");
})

app.get("/privacy-policy", (req, res) => {
  res.render("privacyPolicy");
});

app.get("/admin", (req, res) => {
  res.send("Admin")
})

app.post("/", (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: "emagstudiosofficial@gmail.com",
    subject: `${req.body.name} wants to contact you!`,
    text: `Hi, I am ${req.body.name} \n Email: ${req.body.email} \n Contact me: ${req.body.number} \n Message: ${req.body.message}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send('error')
    } else {
      console.log("Email sent: " + info.response);
      res.send('success')
    }
  });
});
app.get("*", (req,res) => {
  res.send("<h1> Opps!! something went wrong </h1>")
})


app.listen(port , () => {
  console.log("server starts at " + port);
});
app.listen(80, () => {
  console.log("server starts at 80")
})