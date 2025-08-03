/* eslint-disable no-undef */
import { InferenceClient } from "@huggingface/inference";
import "dotenv/config";

export async function imageGeneratingHuggingface(prompt) {
  if (!process.env.HF_TOKEN) {
    throw new Error("HF_TOKEN is not configured");
  }

  const client = new InferenceClient(process.env.HF_TOKEN);

  try {
    const imageBlob = await client.textToImage({
      model: "stabilityai/stable-diffusion-2-1",
      inputs: prompt,
      parameters: {
        negative_prompt: "blurry, bad quality, distorted",
        num_inference_steps: 30,
        guidance_scale: 7.5,
      },
    });

    const arrayBuffer = await imageBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return {
      image: buffer,
      format: "image/png",
    };
  } catch (error) {
    console.error("Image generation error:", error);
    throw error;
  }
}
