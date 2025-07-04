const express = require("express");
const {
  validateRegister,
  handleValidationErrors,
  validateLogin,
} = require("../middleware/validation");
const { register, login } = require("../controllers/authController");
const router = express.Router();

router.post("/register", validateRegister, handleValidationErrors, register);
router.post("/login", validateLogin, handleValidationErrors, login);

module.exports = router;
