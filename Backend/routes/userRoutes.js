const express = require("express");
const router = express.Router();

const { userRegister, userLogIn } = require("../controllers/authController");

router.post("/u/register", userRegister);
router.post("/u/signIn", userLogIn);

module.exports = router;
