const express = require("express");
const {
  getAllUsers,
  getUser,
  replaceUser,
  updateUser,
  deleteUser,
} = require("../controller/user-controller");
const router = express.Router();

exports.exportrouter = router
  .get("/", getAllUsers)
  .get("/:id", getUser)
  .put("/:id", replaceUser)
  .patch("/:id", updateUser)
  .delete("/:id", deleteUser);
