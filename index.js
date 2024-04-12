const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const session = require("express-session");

const userDetails = "userList.json";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "this is a secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/home", (req, res) => {
  res.render("home.ejs", {
    title: "HomePage",
  });
});

app.get("/this", (req, res) => {
  console.log(req.session);
  console.log(req.sessionID);
  req.session.visited = true;
});

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.sessionID);
  res.render("home.ejs", { title: "HomePage" });
});
app.get("/login", (req, res) => {
  res.render("login.ejs", { title: "LoginPage" });
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.redirect("/home");
});

app.get("/registerPage", (req, res) => {
  res.render("registerPage", { title: "registerPage" });
});

app.post("/registerPage", (req, res) => {
  // console.log(JSON.stringify(req.body));

  const userObj = JSON.parse(fs.readFileSync("userList.json", "utf8"));

  const duplicateUser = userObj.find((user) => {
    return (
      user.userName == req.body.userName || user.userMail == req.body.userMail
    );
  });
  if (duplicateUser == undefined) {
    // const parsedUserList = userObj;
    userObj.push(req.body);
    // console.log(parsedUserList);
    const stringifiedUserList = JSON.stringify(userObj);
    fs.writeFile("userList.json", stringifiedUserList, (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.json({ status: false });
  } else {
    console.log("found duplicate");
    res.json({ status: true });
  }

  // res.redirect("home");
});

module.exports = app;
