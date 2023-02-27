const express = require("express");
const router = express.Router();

const {
  userRegister,
  userLogIn,
  userLogOut,
  getUsers,
} = require("../controllers/authController");

router.post("/u/register", userRegister);
router.post("/u/logIn", userLogIn);
router.get("/u/logOut", userLogOut);
router.get("/u/isLoggedIn", userAuth, isLoggedIn);
router.get("/u/getUsers", getUsers);

module.exports = router;
