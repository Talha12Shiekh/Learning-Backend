const mongoose = require('mongoose');


module.exports = async function main() {
  await mongoose.connect('mongodb://localhost:27017');

  console.log("Database connected successfully !");
  console.log("---------------------------------")
}