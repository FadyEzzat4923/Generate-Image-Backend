import { Router } from "express";
import { body } from "express-validator";
import { generateImage } from "../controllers/ai.js";
import isAuth from "../middleware/is-auth.js";

const router = Router();

router.post(
  "/generate-image",
  isAuth,
  [body("prompt", "Prompt is required").trim().isLength({ min: 1 })],
  generateImage
);

export default router;
