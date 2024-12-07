// src/utils/skinToneDetection.js
export const detectSkinTone = (imageData) => {
    const pixels = imageData.data;
    let r = 0, g = 0, b = 0;
    
    for (let i = 0; i < pixels.length; i += 4) {
      r += pixels[i];
      g += pixels[i + 1];
      b += pixels[i + 2];
    }
    
    const pixelCount = pixels.length / 4;
    const avgR = r / pixelCount;
    const avgG = g / pixelCount;
    const avgB = b / pixelCount;
    
    return classifySkinTone(avgR, avgG, avgB);
  };