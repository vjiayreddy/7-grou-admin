// src/components/ImageCapture.js
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Button, Paper, Box } from '@mui/material';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

const ImageCapture = ({ onAnalysis, setLoading }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const analyzeImage = async () => {
    if (!imgSrc) return;

    setLoading(true);
    try {
      // Load MobileNet model
      const model = await mobilenet.load();

      // Create an HTML image element from the captured image
      const img = new Image();
      img.src = imgSrc;
      await img.decode(); // Wait for image to load

      // Make prediction
      const tfImg = tf.browser.fromPixels(img);
      const predictions = await model.classify(tfImg);

      // Process results
      onAnalysis(processResults(predictions));
    } catch (error) {
      console.error('Analysis error:', error);
    }
    setLoading(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{ width: '100%', maxWidth: '500px' }}
        />
        <Box mt={2}>
          <Button variant="contained" onClick={capture} sx={{ mr: 1 }}>
            Capture
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={analyzeImage}
            disabled={!imgSrc}
          >
            Analyze
          </Button>
        </Box>
        {imgSrc && (
          <img 
            src={imgSrc} 
            alt="captured" 
            style={{ 
              width: '100%', 
              maxWidth: '500px', 
              marginTop: '20px' 
            }} 
          />
        )}
      </Box>
    </Paper>
  );
};

export default ImageCapture;