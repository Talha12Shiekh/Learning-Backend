const mongoose = require("mongoose");
const { Schema } = mongoose;

const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new Schema({
  firstName: { type: String, required: [true, "User name is required! "], maxLength: [16, "First name should be of maximum 16 digits"] },
  lastName: { type: String, maxLength: [16, "First name should be of maximum 16 digits"] },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: { type: String, minLength: 6, required: true },
  token: String
});

exports.User = mongoose.model("User", userSchema);
