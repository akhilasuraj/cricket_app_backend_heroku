
const express = require("express");
const auth = express.Router();
const cors = require("cors");
const con_User = require("../controllers/User");


auth.use(cors())

auth.post('/register',con_User.register);
auth.post('/login',con_User.login);

module.exports = auth ;

