const passError = document.querySelector(".pass-error");
const button = document.getElementById("register");
const emailError = document.querySelector('.email-error-static')
const confirmError = document.querySelector(".confirm-error");
const existingUser = document.querySelector(".existing-user");
// const fs = require("fs");

button.addEventListener("click", (event) => {
  // event.preventDefault();
  const userName = document.getElementById("userName").value;
  const userMail = document.getElementById("userMail").value;
  const newPassWord = document.getElementById("createPass").value;
  const confirmPassWord = document.getElementById("confirmPass").value;


  if (userName == "" || userMail == "" || newPassWord == "") {
    alert("enter your user Credentials to move forward");
    event.preventDefault()
    return;
  } else {
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[^ ]{8,20}$/;
    const emailRegex = /^[a-zA-Z0-9]{5,30}@[a-zA-Z]{2,7}.[a-zA-Z]{1,5}$/;

    passError.style.display = "none"
    confirmError.style.display = "none"

    if (userName.length <= 2) {
      event.preventDefault()
    }


    if (!emailRegex.test(userMail)) {
      console.log("field must be in email format");
      emailError.style.display = "block"
      event.preventDefault()
      // return
    }

    if (!passRegex.test(newPassWord)) {
      console.log("pass not valid");
      passError.style.display = "block";
      event.preventDefault()
      // return
    }

    if (newPassWord != confirmPassWord) {
      console.log("password not match");
      confirmError.style.display = "block";
      event.preventDefault()
      // return
    }

  }
  return
});
