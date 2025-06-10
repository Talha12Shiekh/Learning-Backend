const { User } = require("../models/user-model");

exports.createUser = async (req, res) => {
  try {
    const usr = new User({
      firstName: "Talha shiekh is the best",
      lastName: "shiekh",
      age: 20,
      email: "tk.shiekh4567@gmail.com",
      address: {
        pincode: 1111,
        street: "0011 g-3",
        phone: "03214946471",
      },
    });
    const doc = await usr.save();
    console.log(doc);
    res.status(201).json(doc);
  } catch (error) {
    res.status(404).json(error);
  }
};
