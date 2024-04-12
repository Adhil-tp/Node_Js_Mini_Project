const path = require("path");const fs = require("fs");
const { setTimeout } = require("timers/promises");
const obj = {
  name: "adhil",
};

const objs = JSON.stringify(obj);

fs.readFile("userList.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    const arr = JSON.parse(data);
    arr.push(obj);
    const jsonArr = JSON.stringify(arr);
    fs.writeFile("userList.json", jsonArr, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
});

arr = [33, 2, 45, 34];

const narr = [];
arr.forEach((element) => {
  if (element % 2 == 0) {
    narr.push(8);
  } else {
    narr.push(element);
  }
  return narr;
});
console.log(narr);

// hello this is some text and this is not validated
