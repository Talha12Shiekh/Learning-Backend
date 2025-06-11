const express = require("express");
const {
    createUsers
} = require("../controller/auth-controller");
const router = express.Router();

exports.exportrouter = router
    .post("/", createUsers);
