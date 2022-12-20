const mongoose = require("mongoose");

// database name --> co227testdb
function connect() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect("mongodb://localhost/co300testdb", { useNewUrlParser: true })
      .then((res, err) => {
        if (err) return reject(err);
        resolve();
        console.log("connected to the MongoDB database");
      });
  });
}

function close() {
  return new Promise((resolve, reject) => {
    mongoose.connection
      .close()
      .then(console.log("Close connection with database"));
  });
}
module.exports = { connect, close };