const mongoose = require('mongoose');


exports.connectToMongoose = async function main() {
  await mongoose.connect('mongodb://localhost:27017');

  console.log("Database connected successfully !");
  console.log("---------------------------------")
}