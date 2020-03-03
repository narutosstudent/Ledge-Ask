const express = require("express");
const auth = require("../middleware/auth");
const {check} = require("express-validator");
const authController = require("../controllers/auth");
const router = express.Router();


// Sign Up
router.post("/register", [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({min: 6}),
    check("profession", "It is required for you to state what you do at the moment")
],
authController.register
);

// Sign In
router.post("/login", [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
],
authController.login
);

// User Image Upload
router.put("/image", auth, authController.addImage);


// Get User
router.get("/", auth, authController.getUser);

// Get User By his or her id
router.get("/:userId", authController.getUserById);


module.exports = router;