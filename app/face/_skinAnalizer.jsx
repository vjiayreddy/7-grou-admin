// src/components/SkinAnalyzer.js
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import {
  Button,
  Paper,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { analyzeSkinCondition } from "../../utils/skinanalysis";
import AnalysisResults from "./_analysisResults";
const SkinAnalyzer = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setAnalysis(null);
  }, [webcamRef]);

  const analyzeImage = async () => {
    if (!imgSrc) return;

    setLoading(true);
    try {
      const img = await createImageElement(imgSrc);
      const tinyYolovOptions = new faceapi.TinyYolov2Options({
        inputSize: 416, // Can be 320, 416, or 608
        scoreThreshold: 0.5, // Confidence threshold
      });
      // const detections = await faceapi
      //   .detectAllFaces(img, tinyYolovOptions)
      //   .withFaceLandmarks()
      //   .withFaceExpressions()
      //   .withAgeAndGender();
      const detections = await faceapi
        .detectSingleFace(
          img,
          new faceapi.TinyYolov2Options({
            inputSize: 416, // Can be 320, 416, or 608
            scoreThreshold: 0.5,
          })
        )
        .withFaceLandmarks()
        .withAgeAndGender()
        .withFaceExpressions();

      if (detections) {
        console.log(detections);
        const results = await analyzeSkinCondition(img, detections);
        setAnalysis(results);
      } else {
        setAnalysis({ error: "No face detected" });
      }
    } catch (error) {
      console.error("Analysis error:", error);
      setAnalysis({ error: "Analysis failed" });
    }
    setLoading(false);
  };

  const createImageElement = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  };

  console.log(analysis);

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{ width: "100%", maxWidth: "500px" }}
        />

        <Box mt={2}>
          <Button variant="contained" onClick={capture} sx={{ mr: 1 }}>
            Capture
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={analyzeImage}
            disabled={!imgSrc || loading}
          >
            Analyze
          </Button>
        </Box>

        {imgSrc && (
          <img
            src={imgSrc}
            alt="captured"
            style={{ width: "100%", maxWidth: "500px", marginTop: "20px" }}
          />
        )}

        {loading && <CircularProgress sx={{ mt: 2 }} />}

        {analysis && <AnalysisResults results={analysis} />}
      </Box>
    </Paper>
  );
};

export default SkinAnalyzer;
