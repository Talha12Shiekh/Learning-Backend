const { User } = require("../models/user-model");
var jwt = require('jsonwebtoken');
const fs = require("fs");
const path = require("path");
const bcrypt = require('bcrypt');

const privatekey = fs.readFileSync(path.resolve(__dirname, "../private.key"), "utf-8");

const saltRounds = 10;

exports.signUp = async (req, res) => {
    const user = new User(req.body);
    let token = jwt.sign({ email: req.body.email }, privatekey, { algorithm: 'RS256' });
    const hashpswrd = bcrypt.hashSync(req.body.password, saltRounds);
    user.token = token;
    user.password = hashpswrd;
    try {
        const doc = await user.save();
        res.status(201).json({token});
    } catch (error) {
        res.status(404).json(error);
    }
};


exports.login = async (req, res) => {

    try {
        const doc = await User.findOne({ email: req.body.email });
        const isAuthenticated = bcrypt.compareSync(req.body.password, doc.password);
        if (isAuthenticated) {
            let token = jwt.sign({ email: req.body.email }, privatekey, { algorithm: 'RS256' });
            doc.token = token;
            doc.save();
            res.json({ token });
        } else {
            res.sendStatus(401);
        }
    } catch (er) {
        res.status(401).json(er);
    }
}
