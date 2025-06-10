const mongoose = require("mongoose");
const { Schema } = mongoose;

// firstName is required, maximum length 16 chars
// lastName is not required, maximum length 16 chars
// age is a Number, minimum value 12, maximum 100
// email make a validator of email, as given in mongoose documentation.
// address make address a nested data structure which has its own Schema [ AddressSchema ??] [ Hint: check mongoose documentation for sub-documents to do it

// Create addressSchema needed in above example as :

// pincode : Number, required
// street : String, required
// phone: String, length=10

const addressSchema = new Schema({
  pincode: { type: Number, required: true },
  street: { type: String, required: true },
  phone: { type: String, length: 11 },
});

const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new Schema({
  firstName: { type: String, required: [true,"User name is required! "], maxLength: [16,"First name should be of maximum 16 digits"] },
  lastName: { type: String, maxLength: [16,"First name should be of maximum 16 digits"] },
  age: { type: Number, min: [12,"Age should be not lesser than 12"], max: [100,"User age cannot exceed 100"] },
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
  address: addressSchema,
});

exports.User = mongoose.model("User", userSchema);
