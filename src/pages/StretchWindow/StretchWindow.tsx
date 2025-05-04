import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { initDetector, getPose } from '../../lib/pose/poseEstimator';
import type { Keypoint } from '@tensorflow-models/pose-detection';
import {
  predictStretch,
  loadClassifierFromJSON,
} from '../../lib/classifier/knnStretchClassifier';

import { getJsonFilenameFromLabel } from '../../lib/utils/format';

import './StretchWindow.scss';

const StretchWindow = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [feedback, setFeedback] = useState('');

  const location = useLocation();
  const stretchName = location.state?.stretchName || 'Unknown';

  useEffect(() => {
    const setupCamera = async () => {
      if (!videoRef.current) return;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 500, height: 500 },
        audio: false,
      });
      videoRef.current.srcObject = stream;

      await new Promise((resolve) => {
        videoRef.current!.onloadedmetadata = () => {
          resolve(true);
        };
      });

      videoRef.current!.play();
    };

    const loadAllModels = async () => {
      await initDetector();
      setModelLoaded(true);
    };

    setupCamera();
    loadAllModels();
  }, []);

  useEffect(() => {
    const loadDataset = async () => {
      const filename = getJsonFilenameFromLabel(stretchName);

      try {
        const res = await fetch(`/knn-data/${filename}`);
        if (!res.ok) throw new Error(`Missing file: ${filename}`);
        const json = await res.json();
        loadClassifierFromJSON(json);
      } catch (err) {
        console.warn(
          `⚠️ No dataset found for: ${stretchName}. Skipping prediction.`,
          err
        );
      }
    };

    loadDataset();
  }, [stretchName]);

  useEffect(() => {
    let animationFrameId: number;

    const detectPose = async () => {
      if (
        !videoRef.current ||
        !canvasRef.current ||
        !modelLoaded ||
        videoRef.current.videoWidth === 0 ||
        videoRef.current.videoHeight === 0
      ) {
        animationFrameId = requestAnimationFrame(detectPose);
        return;
      }

      const pose = await getPose(videoRef.current);
      const ctx = canvasRef.current.getContext('2d');

      if (ctx && pose) {
        ctx.clearRect(0, 0, 500, 500);
        drawKeypoints(pose.keypoints, ctx);
      }

      if (pose?.keypoints) {
        const input = normalizeKeypoints(pose.keypoints, 500, 500);
        const predictedLabel = await predictStretch(input);

        if (predictedLabel === stretchName) {
          setFeedback('✅ Correct Pose');
        } else {
          setFeedback('❌ Pose Not Recognized');
        }
      }

      animationFrameId = requestAnimationFrame(detectPose);
    };

    if (modelLoaded) {
      detectPose();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [modelLoaded, stretchName]);

  const normalizeKeypoints = (
    keypoints: Keypoint[],
    width: number,
    height: number
  ): number[] => {
    return keypoints.flatMap((k) => [
      (width - k.x) / width, // Flip X to match mirror view
      k.y / height,
    ]);
  };

  const drawKeypoints = (
    keypoints: Keypoint[],
    ctx: CanvasRenderingContext2D
  ) => {
    const width = ctx.canvas.width;

    keypoints.forEach((keypoint) => {
      if ((keypoint.score ?? 0) > 0.5) {
        const flippedX = width - keypoint.x;
        ctx.beginPath();
        ctx.arc(flippedX, keypoint.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'aqua';
        ctx.fill();
      }
    });
  };

  return (
    <div className="stretch-window-container">
      <h2>Stretch Tracking Window</h2>

      <div style={{ position: 'relative', width: '500px', height: '500px' }}>
        <video
          ref={videoRef}
          width={500}
          height={500}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            transform: 'scaleX(-1)', // mirror view
          }}
          autoPlay
          muted
        />
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
      </div>

      <div id="label-container">
        <h3 className="status">
          {modelLoaded ? 'Pose detection active!' : 'Loading models...'}
        </h3>
        <h3
          className={`feedback ${
            feedback.includes('✅')
              ? 'success'
              : feedback.includes('❌')
              ? 'error'
              : ''
          }`}
        >
          {feedback}
        </h3>

        <button
          className="button-status"
          onClick={() => navigate('/stretches')}
        >
          Back to Stretches
        </button>
      </div>
    </div>
  );
};

export default StretchWindow;
