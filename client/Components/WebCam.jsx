import React from "react";
import Webcam from "react-webcam";
const WebCam = () => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
  }, [webcamRef]);
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
  return (
  
      <div className="webcam-container">
        <Webcam
          audio={false}
          height={200}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={220}
          videoConstraints={videoConstraints}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            capture();
          }}
        >
          Capture
        </button>
      </div>
   
  );
};

export default WebCam;
