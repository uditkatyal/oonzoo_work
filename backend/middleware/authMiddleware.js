const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      // decoded will be our object containing user ID because we used it to create the signature

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log("Unauthorised");
      res.status(401).json({
        status: "fail",
        message: "Not authorised token failed",
      });
    }
  }
  if (!token) {
    res.status(401).json({
      status: "fail",
      message: "Not authorised token failed",
    });
  }
};
