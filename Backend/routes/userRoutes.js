const express = require("express");
const router = express.Router();

const {
  userRegister,
  userLogIn,
  userLogOut,
  isLoggedIn,
  getUsers,
} = require("../controllers/authController");

const userAuth = require("../middleware/auth");

router.post("/u/register", userRegister);
router.post("/u/logIn", userLogIn);
router.get("/u/logOut", userLogOut);
router.get("/u/isLoggedIn", userAuth, isLoggedIn);
router.get("/u/getUsers", getUsers);

module.exports = router;
