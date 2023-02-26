const express = require("express");
const router = express.Router();

const { userRegister } = require("../controllers/authController");

router.post("/u/register", userRegister);

module.exports = router;
