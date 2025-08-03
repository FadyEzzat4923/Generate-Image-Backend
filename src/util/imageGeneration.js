/* eslint-disable no-undef */
import Replicate from "replicate";
import "dotenv/config";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function imageGeneration(prompt, options) {
  const input = {
    prompt,
    aspect_ratio: options.aspectRatio ?? "1:1",
    output_format: options.format ?? "webp",
    output_quality: options.quality ?? 80,
    safety_tolerance: 2,
    prompt_upsampling: true,
  };
  const output = await replicate.run("black-forest-labs/flux-1.1-pro", {
    input,
  });
  const outputStream = output[0];

  const imageBlob = await outputStream.blob();
  const imageBuffer = Buffer.from(await imageBlob.arrayBuffer());
  const format = imageBlob.type || "image/webp";
  return {
    image: imageBuffer, format 
  };
}
