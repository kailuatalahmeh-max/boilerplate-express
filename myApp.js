require("dotenv").config();
let express = require("express");
let app = express();

console.log("Hello World");

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/users", (req, res) => {
  res.send("قائمة المستخدمين");
});
app.get("/json", (req, res) => {
  let message = "Hello json";

  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }

  res.json({
    message: message,
  });
});

module.exports = app;
