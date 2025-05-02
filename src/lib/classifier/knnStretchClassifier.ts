import * as tf from '@tensorflow/tfjs';
import * as knnClassifier from '@tensorflow-models/knn-classifier';

const classifier = knnClassifier.create();

/**
 * Add a stretch example with a label.
 * @param input Flattened normalized [x1, y1, ..., x17, y17]
 * @param label Class name (e.g., 'Neck Stretch (L)')
 */
export function addStretchExample(input: number[], label: string) {
  const inputTensor = tf.tensor1d(input);
  classifier.addExample(inputTensor, label);
  inputTensor.dispose();
}

/**
 * Predict the most likely stretch based on current pose input.
 * @param input Flattened normalized [x1, y1, ..., x17, y17]
 * @returns Predicted label
 */
export async function predictStretch(input: number[]): Promise<string> {
  if (classifier.getNumClasses() === 0) return 'No classes yet';

  const inputTensor = tf.tensor1d(input);
  const result = await classifier.predictClass(inputTensor);
  inputTensor.dispose();
  return result.label;
}

/**
 * Check how many labeled classes exist
 */
export function getKnownLabels(): string[] {
  return Object.keys(classifier.getClassifierDataset());
}

/**
 * Clear all examples from memory
 */
export function clearClassifier() {
  classifier.clearAllClasses();
}

export function getClassifierDatasetJSON(): Record<string, number[][]> {
  const dataset = classifier.getClassifierDataset();
  return Object.fromEntries(
    Object.entries(dataset).map(([label, tensor]) => [
      label,
      tensor.arraySync() as number[][],
    ])
  );
}

export function getExampleCount(label: string): number {
  const dataset = classifier.getClassifierDataset();
  const tensor = dataset[label];
  return tensor ? tensor.shape[0] : 0;
}
