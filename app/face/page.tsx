"use client";
import React, { useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import { Container, Typography, CircularProgress } from "@mui/material";
import SkinAnalyzer from "./_skinAnalizer";

function App() {
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
        faceapi.nets.ageGenderNet.loadFromUri("/models"),
        faceapi.nets.tinyYolov2.loadFromUri("/models"),
      ]);
      setModelsLoaded(true);
    } catch (error) {
      console.error("Error loading models:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center" gutterBottom>
        Skin Analysis AI
      </Typography>
      {!modelsLoaded ? <CircularProgress /> : <SkinAnalyzer />}
    </Container>
  );
}

export default App;


