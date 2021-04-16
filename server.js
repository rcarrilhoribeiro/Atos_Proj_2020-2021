const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("Connection to database successful...");
  })
  .catch(function (err) {
    console.log("Failed to connect to datase!");
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Application is running and listening on port ${port}...`);
});
