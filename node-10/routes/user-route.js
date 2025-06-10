const express = require("express");
const { createUser } = require("../controller/user-controller");
const router = express.Router();

exports.userRouter = router.post("/",createUser);