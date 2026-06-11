const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
let express = require("express");
let app = express();

app.use(express.json())

console.log("Hello World");

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
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

app.get("/users/:id", (req, res) => {
  const users = [
    { id: uuidv4(), name: "أحمد" },
    { id: uuidv4(), name: "محمد" },
    { id: uuidv4(), name: "سارة" },
    { id: uuidv4(), name: "جابر" },
  ];

  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "المستخدم غير موجود" });
  }
});


app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  res.json({ message: `طلبت المستخدم رقم ${id}` });
});

module.exports = app;
