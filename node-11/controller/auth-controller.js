const { User } = require("../models/user-model");
var jwt = require('jsonwebtoken');
const fs = require("fs");
const path = require("path");

const privatekey = fs.readFileSync(path.resolve(__dirname,"../private.key"),"utf-8");

exports.createUsers = async (req, res) => {
    const user = new User(req.body);
    let token = jwt.sign({ email: req.body.email }, privatekey, { algorithm: 'RS256' });
    user.token = token;
    try {
        const doc = await user.save();
        res.status(201).json(doc);
    } catch (error) {
        res.status(404).json(error);
    }
};

