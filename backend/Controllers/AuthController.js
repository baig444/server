const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("../models/AuthSchema");
const secretKey = "paisenikal";

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User not found",
        });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(400).json({
            success: false,
            message: "Invalid password",
        });
    }

    const payload = {
        user: {
          id: user.id,
          email: user.email
        },
      };

    jwt.sign(payload, secretKey, { expiresIn: "1000000h" }, (err, token) => {
        if (err) throw err;
        res.cookie("token", token, { maxAge: 3600000, httpOnly: true });
        res.json({
          token,
          user: {
            id: user.id,
            email: user.email,
          },
          message: "Logged in successfully",
        });
      });
}


exports.register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide email and password",
        });
    }

    const existingUser = await Auth.findOne({ email });

    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "User already exists",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Auth({
        email,
        password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
        success: true,
        message: "User created successfully",
    });

}

exports.logout = async (req, res) => {
    res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
}
