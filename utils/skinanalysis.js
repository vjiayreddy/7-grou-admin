// src/utils/skinAnalysis.js
import * as tf from '@tensorflow/tfjs';

export const analyzeSkinCondition = async (image, faceDetection) => {
  // Extract face region
  const faceRegion = extractFaceRegion(image, faceDetection);
  
  // Analyze skin features
  const features = await analyzeFeatures(faceRegion);
  console.log(features);
  return {
    skin_tone: features.skinTone,
    acne_probability: features.acne,
    wrinkles: features.wrinkles,
    spots: features.spots,
    texture: features.texture
  };
};

const extractFaceRegion = (image, detection) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  const box = detection.detection.box;
  canvas.width = box.width;
  canvas.height = box.height;
  
  ctx.drawImage(
    image,
    box.x, box.y,
    box.width, box.height,
    0, 0,
    box.width, box.height
  );
  
  return canvas;
};

const analyzeFeatures = async (faceRegion) => {
  // Convert image to tensor
  const tensor = tf.browser.fromPixels(faceRegion)
    .resizeNearestNeighbor([224, 224])
    .toFloat()
    .expandDims();

  // Simple color analysis for skin tone
  const skinTone = await analyzeSkinTone(tensor);
  
  // Basic texture analysis
  const textureFeatures = await analyzeTexture(tensor);

  console.log(skinTone)

  return {
    skinTone: skinTone,
    acne: textureFeatures.acne,
    wrinkles: textureFeatures.wrinkles,
    spots: textureFeatures.spots,
    texture: textureFeatures.overall
    
  };
};

const analyzeSkinTone = async (tensor) => {
  const rgbValues = await tensor.mean([1, 2]).data();
  // Simple skin tone classification based on RGB values
  return calculateSkinTone(rgbValues);
};

const analyzeTexture = async (tensor) => {
  // Basic texture analysis using image statistics
  const imageData = await tensor.data();
  
  return {
    acne: Math.random(), // Placeholder for actual analysis
    wrinkles: Math.random(),
    spots: Math.random(),
    overall: Math.random()
  };
};

const calculateSkinTone = (rgb) => {
  // Simple skin tone calculation
  return (rgb[0] + rgb[1] + rgb[2]) / (3 * 255);
};