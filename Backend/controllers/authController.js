const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { TOKEN_SECRET } = process.env;

// function for register user
exports.userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if all the required fields are present in the request body
    if (!(name && email && password)) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are mandatory" });
    }

    // Check if user already exists with the given email
    const checkIfUserExist = await User.findOne({ email });
    if (checkIfUserExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email id!",
      });
    }

    // Encrypt password and create user
    const encryptedPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: encryptedPass,
    });

    // Generate token for the user
    const token = jwt.sign(
      {
        id: user._id,
      },
      TOKEN_SECRET,
      { expiresIn: "4h" }
    );

    // Add token to the user object and remove password before sending response
    user.token = token;
    user.password = undefined;

    res.status(200).json({
      success: true,
      message: `Hello ${name}, Your account is created successfully`,
      user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in response route" });
  }
};

// function for user Login
exports.userLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all the required fields are present in the request body
    if (!(email && password)) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are mandatory" });
    }

    // Find user with the given email and validate password
    const user = await User.findOne({ email });
    if (!(user && bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ success: false, message: "Email or Password is incorrect" });
    }

    // Generate token for the user
    const token = jwt.sign(
      {
        id: user._id,
      },
      TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    // Add token to the user object and remove password before sending response
    user.token = token;
    user.password = undefined;

    // Set the token as a cookie and send response
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 2 * 24 * 3600000),
      })
      .json({
        success: true,
        message: "Logged In Successfully",
        token,
        user,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in response route",
    });
  }
};

// log out a user by clearing the token in cookie
exports.userLogOut = (_req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "LogOut successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in response route",
    });
  }
};

// checks if a user is logged in or not by checking for the userId in the request body
exports.isLoggedIn = async (req, res) => {
  const userId = req.body.userId;
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User is not logged in" });
  }
  // Find the user with the given userId and return the user object without the email, password, todos, and token fields
  const user = await User.findById(
    { _id: userId },
    "-email -password -todos -token"
  );

  res.status(200).json({ success: true, message: "User is logged in", user });
};

// get all the users from the database along with their todos
exports.getUsers = async (_req, res) => {
  try {
    // Get all the users from the DB along with their todos
    const users = await User.find().populate("todos");
    // console.log(users);
    if (!users) {
      // If no users found
      res.status(400).send("Unable to find users");
    }

    // Send the list of users
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
