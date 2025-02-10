const express = require("express");
const router = express.Router();
const UsersController = require("../controller/users_controller");
const verfiyToken = require("../middleware/verfiyToken.js");
const { functions } = require("lodash");
router.route("/")
.get(verfiyToken , UsersController.GetAllUsers);
router.route("/Register")
.post(UsersController.Register);  
router.route("/Login")
.post(UsersController.Login);

module.exports = router;

