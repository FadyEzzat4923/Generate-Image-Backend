/* eslint-disable no-undef */
import { hash } from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export async function signup(req, res) {
  const validation = validationResult(req);
  const errors = {};
  if (!validation.isEmpty()) {
    for (const err of validation.array()) {
      errors[err.path] = err.msg;
    }
    return res.status(400).json({ message: errors });
  }
  const { name, email, password } = req.body;
  try {
    const hashPassword = await hash(password, 12);
    const user = new User({ name, password: hashPassword, email });
    await user.save();
    res.status(201).json({ message: "Account created successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error creating user account." });
  }
}

export async function login(req, res) {
  const validation = validationResult(req);
  const errors = {};
  if (!validation.isEmpty()) {
    for (const err of validation.array()) {
      errors[err.path] = err.msg;
    }
    return res.status(400).json({ message: errors });
  }
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({message: "Error logging in user."});
  }
}
