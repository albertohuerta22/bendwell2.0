// src/lib/pose/poseEstimator.ts
import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs-core';

let detector: poseDetection.PoseDetector;

export async function initDetector() {
  await tf.setBackend('webgl');
  await tf.ready();
  detector = await poseDetection.createDetector(
    poseDetection.SupportedModels.MoveNet,
    {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
    }
  );

  console.log('TFJS backend:', tf.getBackend());
}

export async function getPose(video: HTMLVideoElement) {
  if (!detector) {
    console.warn('Detector not initialized.');
    return null;
  }

  const poses = await detector.estimatePoses(video, {
    maxPoses: 1,
    flipHorizontal: false,
  });

  return poses[0] || null;
}
