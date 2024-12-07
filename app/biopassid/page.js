// CameraComponent.jsx
"use client";
import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

const CameraComponent = ({ onCapture, onError }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [guidance, setGuidance] = useState('');

  useEffect(() => {
    initializeFaceDetection();
  }, []);

  const initializeFaceDetection = async () => {
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      ]);

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640,
          height: 480,
          facingMode: 'user'
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsInitialized(true);
      }
    } catch (error) {
      onError('Camera initialization failed: ' + error.message);
    }
  };

  const detectFace = async () => {
    if (!isInitialized || !videoRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video.readyState === 4) {
      const detections = await faceapi.detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions()
      ).withFaceLandmarks();

      if (detections.length === 0) {
        setIsFaceDetected(false);
        setGuidance('No face detected. Please position your face in the frame.');
        return;
      }

      if (detections.length > 1) {
        setIsFaceDetected(false);
        setGuidance('Multiple faces detected. Please ensure only one face is visible.');
        return;
      }

      const detection = detections[0];
      const faceBox = detection.detection.box;

      // Check if face is centered and at proper distance
      const isProperPosition = checkFacePosition(faceBox, video);
      
      if (isProperPosition) {
        setIsFaceDetected(true);
        setGuidance('Perfect! Hold still...');
        
        // Draw face frame
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 3;
        ctx.strokeRect(faceBox.x, faceBox.y, faceBox.width, faceBox.height);
      } else {
        setIsFaceDetected(false);
        setGuidance('Please center your face and maintain proper distance');
      }
    }
  };

  const checkFacePosition = (faceBox, video) => {
    const centerX = video.width / 2;
    const centerY = video.height / 2;
    const faceCenter = {
      x: faceBox.x + faceBox.width / 2,
      y: faceBox.y + faceBox.height / 2
    };

    const distanceFromCenter = Math.sqrt(
      Math.pow(centerX - faceCenter.x, 2) + 
      Math.pow(centerY - faceCenter.y, 2)
    );

    // Check if face is centered (within 20% of center)
    const isCentered = distanceFromCenter < (video.width * 0.2);
    
    // Check if face size is appropriate (30-60% of frame height)
    const faceHeightRatio = faceBox.height / video.height;
    const isProperSize = faceHeightRatio > 0.3 && faceHeightRatio < 0.6;

    return isCentered && isProperSize;
  };

  const captureImage = () => {
    if (!isFaceDetected || !videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    const imageData = canvas.toDataURL('image/jpeg');
    onCapture(imageData);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      detectFace();
    }, 100);

    return () => clearInterval(interval);
  }, [isInitialized]);

  return (
    <div className="camera-container">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="camera-video"
      />
      <canvas
        ref={canvasRef}
        className="face-canvas"
        width={640}
        height={480}
      />
      <div className="guidance-text">
        {guidance}
      </div>
      {isFaceDetected && (
        <button 
          className="capture-button"
          onClick={captureImage}
        >
          Capture
        </button>
      )}
    </div>
  );
};

export default CameraComponent;