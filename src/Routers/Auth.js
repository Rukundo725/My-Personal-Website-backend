import express from "express";
import User from "../../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
var router = express.Router();

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     tags:
 *     - USER
 *     summary: Create user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username.
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       '201':
 *             description: User created.
 *       '400':
 *             description: Bad request.
 *       '409':
 *             description: User already exist.
 */

//register end point
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const resultPost = await newUser.save();

    res.status(200).json(resultPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     tags:
 *     - USER
 *     summary: Login user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *      200:
 *        description: Wrong user
 *      400:
 *        description: Wrong password
 */
//login endpoint
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json({ status: "error", code: "400" , error: "Bad Request", message: "The username or password provided is incorrect." });

    const validate = await bcrypt.compare(req.body.password, user.password);
    !validate && res.status(400).json({ status: "error", code: "400" , error: "Bad Request", message: "The username or password provided is incorrect." });

    const { password, ...others } = user._doc;

    jwt.sign(
      others,
      process.env.SECRET,
      { expiresIn: "600s" },
      (err, token) => {
        res.status(200).json({ status: "success", code: "200", message: "LoggedIn", token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", code: "500",message: "internal_server_error" });
  }
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
export const verifyToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
      if (err) {
        res.status(401).json({ status: "error", code: "401" , error: "Unauthorized", message: "Access denied. Please login" });
      } else {
        next();
      }
    });
  } else {
    // Forbidden
    res.status(403).json({ status: "error", code: "403" , error: "Forbidden", message: "Access denied. Please login" });
  }
};

export default router;