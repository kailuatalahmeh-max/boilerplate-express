require("dotenv").config();
let express = require("express");
let app = express();

app.use(express.json());

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
  res.json({ message: message });
});

app.get("/users", (req, res) => {
  const users = [
    { id: 1, name: "أحمد" },
    { id: 2, name: "محمد" },
    { id: 3, name: "سارة" },
    { id: 4, name: "جابر" },
  ];
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const users = [
    { id: 1, name: "أحمد" },
    { id: 2, name: "محمد" },
    { id: 3, name: "سارة" },
    { id: 4, name: "جابر" },
  ];
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "المستخدم غير موجود" });
  }
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  res.json({ message: "تم إضافة المستخدم!", user: newUser });
});

app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedData = req.body;
  res.json({ message: `تم تعديل المستخدم رقم ${id}!`, updatedData });
});

app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id)  // خذ الID من الرابط بس
  res.json({ message: `تم حذف المستخدم رقم ${id}!` })
})


module.exports = app;
