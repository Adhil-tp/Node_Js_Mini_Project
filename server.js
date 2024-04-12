const port = 3000;
const app = require("./index");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

app.listen(port, () => {
  console.log(`the server is running in the port ${port}`);
});
