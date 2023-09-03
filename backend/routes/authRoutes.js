const express = require("express");
const Joi = require("joi");
const { body } = require("express-joi-validation").createValidator({});

const { postRegister, postLogin } = require("../controllers/authControllers");
const auth = require("../middleware/auth");

const router = express.Router();

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  mail: Joi.string().email().required(),
  password: Joi.string().min(6).max(12).required(),
});

const loginSchema = Joi.object({
  mail: Joi.string().email().required(),
  password: Joi.string().min(6).max(12).required(),
});

router.post("/register", body(registerSchema), postRegister);
router.post("/login", body(loginSchema), postLogin);
router.get("/test", auth, (req, res) => {
  res.send("Token Passed");
});

module.exports = router;
