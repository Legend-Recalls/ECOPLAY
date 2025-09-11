import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { Loader2, Camera, Upload, Video } from 'lucide-react';

interface CameraPanelProps {
  onImageCapture: (imageUrl: string) => void;
  isProcessing: boolean;
}

const CameraPanel: React.FC<CameraPanelProps> = ({ onImageCapture, isProcessing }) => {
  const [image, setImage] = useState<string | null>(null);
  const [mode, setMode] = useState<'upload' | 'camera'>('upload');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (mode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [mode]);

  // New useEffect to handle video playback
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(error => {
        console.error("Error playing video:", error);
      });
    }
  }, [stream]); // Depend on stream

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Could not access camera. Please ensure you have a webcam and have granted permission.');
      setMode('upload'); // Fallback to upload mode
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCaptureClick = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
        const imageDataUrl = canvasRef.current.toDataURL('image/png');
        setImage(imageDataUrl);
        stopCamera();
      }
    }
  };

  const handleAnalyze = () => {
    if (image) {
      onImageCapture(image);
    }
  };

  const handleRetake = () => {
    setImage(null);
    if (mode === 'camera') {
      startCamera();
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center h-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Capture Waste</h2>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setMode('upload')}
          className={`px-4 py-2 rounded-full flex items-center space-x-2 ${mode === 'upload' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          <Upload className="w-5 h-5" />
          <span>Upload Image</span>
        </button>
        <button
          onClick={() => setMode('camera')}
          className={`px-4 py-2 rounded-full flex items-center space-x-2 ${mode === 'camera' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          <Video className="w-5 h-5" />
          <span>Use Camera</span>
        </button>
      </div>

      {mode === 'upload' && !image && (
        <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl mb-6">
          <Camera className="w-16 h-16 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">Upload an image of a waste item</p>
          <label htmlFor="file-upload" className="cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors">
            Choose File
          </label>
          <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </div>
      )}

      {mode === 'camera' && !image && (
        <div className="relative w-full pb-[100%] border-2 border-dashed border-gray-300 rounded-xl mb-6 overflow-hidden">
          {stream ? (
            <video ref={videoRef} className="absolute top-0 left-0 w-full h-full object-cover" autoPlay playsInline />
          ) : (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-600">Waiting for camera...</div>
          )}
          <button
            onClick={handleCaptureClick}
            disabled={!stream}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-gray-400"
          >
            Capture
          </button>
        </div>
      )}

      {image && (
        <div className="flex flex-col items-center w-full">
          <img src={image} alt="Preview" className="max-w-full h-auto rounded-xl mb-6 shadow-md" />
          <div className="flex space-x-4">
            <button 
              onClick={handleAnalyze} 
              disabled={isProcessing}
              className="bg-emerald-500 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <span>Analyze Image</span>
              )}
            </button>
            <button
              onClick={handleRetake}
              disabled={isProcessing}
              className="bg-gray-500 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-shadow disabled:bg-gray-400"
            >
              Retake
            </button>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default CameraPanel;