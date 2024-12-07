// src/utils/textureAnalysis.js
export const analyzeTexture = (imageData) => {
    const grayScaleData = convertToGrayscale(imageData);
    const textureFeatures = calculateTextureFeatures(grayScaleData);
    return textureFeatures;
  };