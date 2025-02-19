const Joi = require("joi");

// Middleware to validate request data
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    // Return detailed error message
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).json({ message: "Validation failed", errors });
  }

  next();
};

module.exports = validate;


// const express = require("express");
// const Joi = require("joi");
// const validate = require("../middlewares/validation");

// const router = express.Router();

// // Joi schemas
// const registerSchema = Joi.object({
//   name: Joi.string().min(3).max(30).required(),
//   email: Joi.string().email().required(),
//   password: Joi.string().min(6).required(),
// });

// const loginSchema = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().min(6).required(),
// });

// // Routes
// router.post("/register", validate(registerSchema), (req, res) => {
//   // Handle registration logic here
//   res.json({ message: "User registered successfully", user: req.body });
// });

// router.post("/login", validate(loginSchema), (req, res) => {
//   // Handle login logic here
//   res.json({ message: "Login successful", user: req.body });
// });

// module.exports = router;







// POST /api/user/register
// {
//   "name": "A",
//   "email": "invalid_email",
//   "password": "123"
// }







// {
//    "message": "Validation failed",
//    "errors": [
//      "\"name\" length must be at least 3 characters long",
//      "\"email\" must be a valid email",
//      "\"password\" length must be at least 6 characters long"
//    ]
//  }
 