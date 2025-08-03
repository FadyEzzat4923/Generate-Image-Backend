import { validationResult } from "express-validator";
// import { imageGeneration } from "../util/imageGeneration.js";
import { imageGeneratingHuggingface } from "../util/imageGeneratingHuggingface.js";

export async function generateImage(req, res) {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).json({ message: validation.array()[0].msg });
  }
  const { prompt } = req.body;
  try {
    const { image, format } = await imageGeneratingHuggingface(prompt);
    res.status(201).type(format).send(image);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
