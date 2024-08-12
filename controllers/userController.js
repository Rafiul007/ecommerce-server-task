const User = require("../models/User");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");
require("dotenv").config();

//register user
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  //validation
  if (!name || !email || !password) {
    return res.status(400).json({
      status: "error",
      message: "All fields are required",
    });
  }
  //check if role is valid
  if (!["user", "admin"].includes(role)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid role",
    });
  }
  //check if user already exists
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    return res.status(400).json({
      status: "error",
      message: "User already exists",
    });
  }

  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  //create user
  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //validation
  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "All fields are required",
    });
  }

  //check if user exists
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({
      status: "error",
      message: "Invalid credentials",
    });
  }

  //check if password is correct
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res
      .status(401)
      .json({ status: "error", message: "Invalid credentials" });
  }

  const accessToken = generateAccessToken({ id: user.id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user.id, role: user.role });
  
  res.status(200).json({
    status: "success",
    message: "Login successful",
    accessToken,
    refreshToken,
  });
};

//get authenticated user information
const getProfile = async (req, res) => {
  const id = req.user.id;
  try {
    const user = await User.findByPk(id,{
      attributes: { exclude: ["password", "updatedAt", "createdAt"] }

    });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

//refresh token
const refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token is missing" });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  });
};


module.exports = { registerUser, loginUser, getProfile, refreshToken };
