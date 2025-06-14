const { User } = require("../models/user-model");

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(201).json(users);
};

exports.getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const searcheduser = await User.findById(id).populate("cart");
    res.status(201).json(searcheduser);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.replaceUser = async (req, res) => {
  const id = req.params.id;

  try {
    const doc = await User.findOneAndReplace(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    res.status(201).json(doc);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const doc = await User.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    res.status(201).json(doc);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const doc = await User.deleteOne({ _id: id });
    res.status(201).json(doc);
  } catch (error) {
    res.status(404).json(error);
  }
};
