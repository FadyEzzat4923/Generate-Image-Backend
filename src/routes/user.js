/* eslint-disable no-unused-vars */
import { Router } from "express";
import { login, signup } from "../controllers/user.js";
import { compare } from "bcryptjs";
import { body, check } from "express-validator";
import User from "../models/user.js";

const router = Router();

router.post(
  "/signup",
  [
    check("email", "E-Mail must be valid.")
      .trim()
      .isEmail()
      .normalizeEmail()
      .custom(async (val, { req }) => {
        const user = await User.findOne({ email: val });
        if (user) {
          throw new Error("E-Mail is exists already.");
        }
        return true;
      }),
    body("name", "Name is required").trim().isLength({ min: 1 }),
    body(
      "password",
      "Password most be a strong has characters, numbers and at least 1 symbole."
    )
      .trim()
      .isStrongPassword(),
  ],
  signup
);

router.post(
  "/login",
  [
    check("email", "E-Mail must be valid.")
      .trim()
      .isEmail()
      .normalizeEmail()
      .custom(async (val, { req }) => {
        const user = await User.findOne({ email: val });
        if (!user) {
          throw new Error("E-Mail is not exists.");
        }
        return true;
      }),
    body("password")
      .trim()
      .isStrongPassword()
      .custom(async (val, { req }) => {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
          return true;
        }
        const isMatchedPassword = await compare(val, user.password);
        if (!isMatchedPassword) {
          throw new Error("Password is incorrect.");
        }
        return true;
      }),
  ],
  login
);

export default router;
