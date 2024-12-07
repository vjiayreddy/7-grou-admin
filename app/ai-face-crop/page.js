"use client";
import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";


const FaceCropper = () => {
  const [initializing, setInitializing] = useState(false);
  const [image, setImage] = useState(null);
  const [croppedFace, setCroppedFace] = useState(null);
  const imageRef = useRef();
  const canvasRef = useRef();

  // Load face-api models
  useEffect(() => {
    const loadModels = async () => {
      setInitializing(true);
      Promise.all([
        faceapi.nets.tinyFaceDetector.load("/models"),
        faceapi.nets.faceLandmark68Net.load("/models"),
        faceapi.nets.faceRecognitionNet.load("/models")
      ])
        .then(() => setInitializing(false))
        .catch((e) => console.error("Error loading models:", e));
    };
    loadModels();
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Modified function to extract face with extended forehead area
  const extractFaceWithForehead = async (imageElement, detection, landmarks) => {
    const { box } = detection;
    // Get forehead landmarks
    const foreheadLandmarks = landmarks.positions.slice(17, 35); // Eyebrow landmarks
    
    // Calculate the highest point of the eyebrows
    const eyebrowTop = Math.min(...foreheadLandmarks.map(point => point.y));
    
    // Calculate additional forehead space (50% more above eyebrows)
    const foreheadExtension = box.height * 0.3; // Adjust this value to increase/decrease forehead space
    
    // Create new box dimensions
    const newBox = {
      x: box.x,
      y: Math.max(0, eyebrowTop - foreheadExtension), // Ensure we don't go outside the image
      width: box.width,
      height: box.height + (box.y - (eyebrowTop - foreheadExtension))
    };

    // Extract face with extended forehead
    const regionsToExtract = [new faceapi.Rect(
      newBox.x,
      newBox.y,
      newBox.width,
      newBox.height
    )];

    let faceImages = await faceapi.extractFaces(imageElement, regionsToExtract);

    if (faceImages.length === 0) {
      console.log("No face found");
      return;
    }

    // Convert to data URL
    const faceCanvas = faceImages[0];
    const croppedFaceUrl = faceCanvas.toDataURL();
    setCroppedFace(croppedFaceUrl);

    return newBox;
  };

  // Process image and detect face
  const processImage = async () => {
    if (!image || !imageRef.current) return;

    // Clear previous results
    if (canvasRef.current) {
      canvasRef.current.getContext('2d').clearRect(
        0, 0, 
        canvasRef.current.width, 
        canvasRef.current.height
      );
    }

    try {
      // Detect face with landmarks
      const detection = await faceapi
        .detectSingleFace(
          imageRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks();

      if (detection) {
        // Get display size
        const displaySize = {
          width: imageRef.current.width,
          height: imageRef.current.height
        };
        
        // Match canvas dimensions
        faceapi.matchDimensions(canvasRef.current, displaySize);

        // Extract face with extended forehead
        const newBox = await extractFaceWithForehead(
          imageRef.current,
          detection.detection,
          detection.landmarks
        );

        // Draw detection box (optional)
        if (newBox) {
          const drawBox = new faceapi.Box(newBox);
          const resizedBox = faceapi.resizeResults(drawBox, displaySize);
          const drawOptions = {
            label: 'Face',
            boxColor: 'blue'
          };
          new faceapi.draw.DrawBox(resizedBox, drawOptions).draw(canvasRef.current);
        }
      } else {
        console.log("No face detected");
      }
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };

  return (
    <div className="face-cropper">
      <div className="controls">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          disabled={initializing}
        />
        <button 
          onClick={processImage} 
          disabled={!image || initializing}
        >
          Process Image
        </button>
      </div>

      <div className="image-container">
        {image && (
          <div className="original-image">
            <h3>Original Image</h3>
            <div style={{ position: 'relative' }}>
              <img
                ref={imageRef}
                src={image}
                alt="Original"
                onLoad={processImage}
              />
              <canvas
                ref={canvasRef}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              />
            </div>
          </div>
        )}

        {croppedFace && (
          <div className="cropped-face">
            <h3>Cropped Face with Forehead</h3>
            <img src={croppedFace} alt="Cropped face" />
          </div>
        )}
      </div>

      {initializing && <div>Initializing...</div>}
    </div>
  );
};

export default FaceCropper;


// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import * as faceapi from "face-api.js";

// const FaceCropper = () => {
//   const [initializing, setInitializing] = useState(false);
//   const [image, setImage] = useState(null);
//   const [croppedFace, setCroppedFace] = useState(null);
//   const imageRef = useRef();
//   const canvasRef = useRef();

//   // Load face-api models
//   useEffect(() => {
//     const loadModels = async () => {
//       setInitializing(true);
//       Promise.all([
//         faceapi.nets.tinyFaceDetector.load("/models"),
//         faceapi.nets.faceLandmark68Net.load("/models"),
//         faceapi.nets.faceRecognitionNet.load("/models")
//       ])
//         .then(() => setInitializing(false))
//         .catch((e) => console.error("Error loading models:", e));
//     };
//     loadModels();
//   }, []);

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImage(e.target.result);
//       };
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   // Modified function to extract full face with ears
//   const extractFullFace = async (imageElement, detection, landmarks) => {
//     const { positions } = landmarks;
    
//     // Get key facial landmarks
//     const leftEar = positions[0];  // Left ear region
//     const rightEar = positions[16]; // Right ear region
//     const forehead = Math.min(...positions.slice(17, 26).map(p => p.y)); // Top of eyebrows
//     const chin = positions[8]; // Bottom of chin
    
//     // Calculate extended boundaries
//     const foreheadExtension = (chin.y - forehead) * 0.5; // 50% extra forehead space
//     const sideExtension = (rightEar.x - leftEar.x) * 0.2; // 20% extra space on sides

//     // Create new box dimensions with padding
//     const newBox = {
//       x: Math.max(0, leftEar.x - sideExtension),
//       y: Math.max(0, forehead - foreheadExtension),
//       width: Math.min(
//         imageElement.width - (leftEar.x - sideExtension),
//         (rightEar.x - leftEar.x) + (sideExtension * 2)
//       ),
//       height: (chin.y - (forehead - foreheadExtension)) * 1.1 // Add 10% extra space below chin
//     };

//     // Extract face with extended boundaries
//     const regionsToExtract = [new faceapi.Rect(
//       newBox.x,
//       newBox.y,
//       newBox.width,
//       newBox.height
//     )];

//     let faceImages = await faceapi.extractFaces(imageElement, regionsToExtract);

//     if (faceImages.length === 0) {
//       console.log("No face found");
//       return;
//     }

//     // Convert to data URL
//     const faceCanvas = faceImages[0];
//     const croppedFaceUrl = faceCanvas.toDataURL();
//     setCroppedFace(croppedFaceUrl);

//     return newBox;
//   };

//   // Process image and detect face
//   const processImage = async () => {
//     if (!image || !imageRef.current) return;

//     // Clear previous results
//     if (canvasRef.current) {
//       canvasRef.current.getContext('2d').clearRect(
//         0, 0, 
//         canvasRef.current.width, 
//         canvasRef.current.height
//       );
//     }

//     try {
//       // Detect face with landmarks
//       const detection = await faceapi
//         .detectSingleFace(
//           imageRef.current,
//           new faceapi.TinyFaceDetectorOptions({
//             inputSize: 512,
//             scoreThreshold: 0.5
//           })
//         )
//         .withFaceLandmarks();

//       if (detection) {
//         // Get display size
//         const displaySize = {
//           width: imageRef.current.width,
//           height: imageRef.current.height
//         };
        
//         // Match canvas dimensions
//         faceapi.matchDimensions(canvasRef.current, displaySize);

//         // Extract full face
//         const newBox = await extractFullFace(
//           imageRef.current,
//           detection.detection,
//           detection.landmarks
//         );

//         // Draw detection box
//         if (newBox) {
//           const drawBox = new faceapi.Box(newBox);
//           const resizedBox = faceapi.resizeResults(drawBox, displaySize);
//           const drawOptions = {
//             label: 'Full Face',
//             boxColor: '#00ff00',
//             drawLabelOptions: {
//               fontColor: '#00ff00'
//             }
//           };
//           new faceapi.draw.DrawBox(resizedBox, drawOptions).draw(canvasRef.current);
          
//           // Draw landmarks for visualization
//           const resizedLandmarks = faceapi.resizeResults(detection.landmarks, displaySize);
//           faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedLandmarks);
//         }
//       } else {
//         console.log("No face detected");
//       }
//     } catch (error) {
//       console.error("Error processing image:", error);
//     }
//   };

//   return (
//     <div className="face-cropper">
//       <div className="controls">
//         <input 
//           type="file" 
//           accept="image/*" 
//           onChange={handleImageChange} 
//           disabled={initializing}
//         />
//         <button 
//           onClick={processImage} 
//           disabled={!image || initializing}
//           className="process-btn"
//         >
//           Process Image
//         </button>
//       </div>

//       <div className="image-container">
//         {image && (
//           <div className="original-image">
//             <h3>Original Image with Detection</h3>
//             <div style={{ position: 'relative' }}>
//               <img
//                 ref={imageRef}
//                 src={image}
//                 alt="Original"
//                 onLoad={processImage}
//               />
//               <canvas
//                 ref={canvasRef}
//                 style={{
//                   position: 'absolute',
//                   top: 0,
//                   left: 0
//                 }}
//               />
//             </div>
//           </div>
//         )}

//         {croppedFace && (
//           <div className="cropped-face">
//             <h3>Cropped Full Face</h3>
//             <img src={croppedFace} alt="Cropped face" />
//           </div>
//         )}
//       </div>

//       {initializing && <div className="initializing">Initializing models...</div>}
//     </div>
//   );
// };

// export default FaceCropper;