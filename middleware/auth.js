const jwt = require("jsonwebtoken");
const User = require("../models/User.proper");

// Middleware to verify JWT token - /
const protect = async (req, res, next) => {
  try {
    let token;

    //check if token is in authenticated header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token provided",
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // check if user still exists and is active
    const user = await User.findById(decoded.userId).select("-password");

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, user not found or user inactive",
      });
    }

    // add user to request
    req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, invalid token",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token expired",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error during authentication",
    });
  }
};

// Middleware to check if user is admin - /getUsers
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied, Admin priviledges required",
    });
  }
};

// Middleware to check if User owns the resouces or is admin
// ***----check back here

const ownerOrAdmin = (req, res, next) => {
  if (
    req.user &&
    (req.user.role === "admin" || req.user._id.toString() === req.params.id)
  ) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied, you can only access your own resources",
    });
  }
};

module.exports = {
  protect,
  adminOnly,
  ownerOrAdmin,
};
