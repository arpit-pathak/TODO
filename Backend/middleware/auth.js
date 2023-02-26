const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET;

// middleware function to authenticate user
const userAuth = async (req, res, next) => {
  // get token from either cookie or authorization header
  const bearerToken = req.header("Authorization")
    ? req.header("Authorization").replace("Bearer ", "")
    : "";

  console.log("cookie:", req.cookies.logIn);
  const token = req.cookies.logIn || bearerToken;

  // if token not found, return error
  if (!token) {
    res.status(401).json({ success: false, message: "Token not found" });
    return;
  }

  try {
    // verify token and set user ID in request body
    const decode = jwt.verify(token, TOKEN_SECRET);
    req.body.userId = decode.id;
  } catch (error) {
    console.log(error);
    // if error in verifying token, return error
    res.status(400).json({
      success: false,
      message: "Invalid or expired session: please log in again",
    });
    return;
  }

  // call next middleware function
  return next();
};

// export userAuth middleware function
module.exports = userAuth;
