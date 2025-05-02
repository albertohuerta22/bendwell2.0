import { useEffect, useRef, useState } from 'react';
import { initDetector, getPose } from '../../lib/pose/poseEstimator';
import type { Keypoint } from '@tensorflow-models/pose-detection';
import {
  addStretchExample,
  getClassifierDatasetJSON,
  clearClassifier,
  getExampleCount,
} from '../../lib/classifier/knnStretchClassifier';

import { useLocation } from 'react-router-dom';

const TrainingWindow = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pose, setPose] = useState<Keypoint[] | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [exampleCount, setExampleCount] = useState(0);

  const location = useLocation();
  const stretchName = location.state?.stretchName || 'Unknown';

  useEffect(() => {
    const setup = async () => {
      await initDetector();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 500, height: 500 },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await new Promise((resolve) => {
          videoRef.current!.onloadedmetadata = () => resolve(true);
        });
        videoRef.current.play();
        setModelLoaded(true);
      }
    };
    setup();
  }, []);

  useEffect(() => {
    let rafId: number;
    const detect = async () => {
      if (
        !videoRef.current ||
        !canvasRef.current ||
        !modelLoaded ||
        videoRef.current.videoWidth === 0 ||
        videoRef.current.videoHeight === 0
      ) {
        rafId = requestAnimationFrame(detect);
        return;
      }

      const p = await getPose(videoRef.current);
      setPose(p?.keypoints || null);

      const ctx = canvasRef.current.getContext('2d');
      if (ctx && p) {
        ctx.clearRect(0, 0, 500, 500);
        drawKeypoints(p.keypoints, ctx);
      }

      requestAnimationFrame(detect);
    };

    detect();
    return () => cancelAnimationFrame(rafId);
  }, [modelLoaded]);

  const normalizeKeypoints = (
    keypoints: Keypoint[],
    width: number,
    height: number
  ): number[] =>
    keypoints.flatMap((k) => [(width - k.x) / width, k.y / height]);

  const saveExample = (label: string) => {
    if (!pose) return;
    const input = normalizeKeypoints(pose, 500, 500);
    addStretchExample(input, label);
    const updatedCount = getExampleCount(label);
    setExampleCount(updatedCount);
    alert(`Saved pose for ${label}`);
    console.log('Current dataset:', getClassifierDatasetJSON());
  };

  const handleClear = () => {
    clearClassifier();
    setExampleCount(0);
  };

  const downloadDataset = () => {
    const json = JSON.stringify(getClassifierDatasetJSON());
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'knn-dataset.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const drawKeypoints = (
    keypoints: Keypoint[],
    ctx: CanvasRenderingContext2D
  ) => {
    const width = ctx.canvas.width;
    keypoints.forEach((k) => {
      if ((k.score ?? 0) > 0.5) {
        const flippedX = width - k.x;
        ctx.beginPath();
        ctx.arc(flippedX, k.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'lime';
        ctx.fill();
      }
    });
  };

  return (
    <div>
      <h2>Training Window</h2>
      <div style={{ position: 'relative', width: '500px', height: '500px' }}>
        <video
          ref={videoRef}
          width={500}
          height={500}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            transform: 'scaleX(-1)',
            zIndex: 1,
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
      <div style={{ marginTop: '1rem' }}>
        <p>
          Saved poses for "{stretchName}": {exampleCount}
        </p>

        <button onClick={() => saveExample(stretchName)}>
          Save Pose for "{stretchName}"
        </button>

        <button onClick={downloadDataset}>Download Dataset</button>

        <button onClick={handleClear}>❌ Clear Dataset</button>
      </div>
    </div>
  );
};

export default TrainingWindow;
