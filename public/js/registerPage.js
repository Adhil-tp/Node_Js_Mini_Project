const passError = document.querySelector(".pass-error");const button = document.getElementById("register");
const confirmError = document.querySelector(".confirm-error");
const existingUser = document.querySelector(".existing-user");
// const fs = require("fs");

button.addEventListener("click", async (event) => {
  event.preventDefault();
  const userName = document.getElementById("userName").value;
  const userMail = document.getElementById("userMail").value;
  const newPassWord = document.getElementById("createPass").value;
  const confirmPassWord = document.getElementById("confirmPass").value;

  //   console.log(typeof userName);
  //   console.log(typeof userMail);
  //   console.log(newPassWord.length);

  if (userName == "" || userMail == "" || newPassWord == "") {
    alert("enter your user Credentials to move forward");
    // return;
  } else {
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[^ ]{8,20}$/;
    const emailRegex = /^[a-zA-Z0-9]{5,30}@[a-zA-Z]{5,10}.[a-zA-Z]{1,5}$/;
    let isMailTrue = false,
      isPassTrue = false,
      isConfirmPassTrue = false;
    if (passRegex.test(newPassWord)) {
      console.log("pass valid");
      passError.style.display = "none";
      isPassTrue = true;
    } else {
      passError.style.display = "block";
    }

    if (emailRegex.test(userMail)) {
      console.log("email format");
      isMailTrue = true;
    } else {
      console.log("not a email");
    }

    if (newPassWord !== confirmPassWord) {
      console.log("password must match");
      confirmError.style.display = "block";
    } else {
      confirmError.style.display = "none";
      isConfirmPassTrue = true;
    }
    console.log(isMailTrue, isConfirmPassTrue, isPassTrue);
    if (isMailTrue && isConfirmPassTrue && isPassTrue) {
      //   console.log("HERE");
      const response = await fetch("/registerPage", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          userName,
          userMail,
          newPassWord,
          confirmPassWord,
        }),
      });
      const data = await response.json();
      if (data.status == true) {
        existingUser.style.display = "block";
      } else if (data.status == false) {
        existingUser.style.display = "none";
        window.location.href = "/home";
      }
    }
  }
});
