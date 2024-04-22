const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const session = require("express-session");
const { error } = require("console");

const userDetails = "userList.json";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "this is a secret",
    saveUninitialized: true,
    httpOnly: true,
    secure: true,
    resave: true
  })
);


app.set("view engine", "ejs");
app.set("views", "views");



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



// register page 

app.get("/registerPage", (req, res) => {
  let duplicateError = req.session.duplicateFound
  req.session.duplicateFound = ''

  let { nameError, emailError, passError, confirmPassError } = req.session
  req.session.nameError = ''
  req.session.emailError = ''
  req.session.passError = ''
  req.session.confirmPassError = ''

  res.render("registerPage", { title: "registerPage", duplicateError, nameError, emailError, passError, confirmPassError });
});


app.post("/registerPage", (req, res) => {

  const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[^ ]{8,20}$/;
  const emailRegex = /^[a-zA-Z0-9]{5,30}@[a-zA-Z]{2,7}.[a-zA-Z]{1,5}$/;
  // console.log(JSON.stringify(req.body));
  console.log(req.body)
  const { userName, userMail, createPass, confirmPass } = req.body




  if (userName.length <= 2) {
    req.session.nameError = "Name must be atleast 3 letters"
    return res.redirect("/registerPage")
  }
  if (!emailRegex.test(userMail)) {
    req.session.emailError = "field must be in email format"
    console.log('redirected to reg page')
    return res.redirect("/registerPage")
  }
  if (!passRegex.test(createPass)) {
    req.session.passError = "the password must contain 8 character , 1 number , 1 uppercase , 1 lowercase and 1 special character"
    return res.redirect("/registerPage")
  }
  if (createPass != confirmPass) {
    req.session.confirmPassError = "this pass must match the previous field"
    return res.redirect("/registerPage")
  }


  // console.log(`name : ${userName}  | mail : ${userMail} | pass : ${createPass}`)



  const userObj = JSON.parse(fs.readFileSync("userList.json", "utf8"));

  const duplicateUser = userObj.find((user) => {
    let cleanedUserName = user.userName.trim().toLowerCase()
    let cleanedUserMail = user.userMail.trim().toLowerCase()
    return (
      cleanedUserName == userName.trim().toLowerCase() ||
      cleanedUserMail == userMail.trim().toLowerCase()
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
    // console.log("Session before no duplicate:", req.session.duplicateFound);
    req.session.duplicateFound = ''
    // console.log("Session after no duplicate:", req.session.duplicateFound);
    res.redirect('/');
  } else {
    console.log("Found duplicate")
    req.session.duplicateFound = "A user is found with same credetials"
    res.redirect("/registerPage")
  }

  // res.redirect("home");
});

module.exports = app;
