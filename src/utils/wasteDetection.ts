import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

let model: mobilenet.MobileNet | null = null;

// Function to load the model, ensures it's only loaded once.
async function loadModel() {
  if (model) {
    return model;
  }
  console.log('Loading MobileNet model...');
  model = await mobilenet.load();
  console.log('Model loaded.');
  return model;
}

export const detectWaste = async (imageElement: HTMLImageElement) => {
  // Ensure the model is loaded before trying to classify.
  const loadedModel = await loadModel();

  console.log('Classifying image...');
  const predictions = await loadedModel.classify(imageElement);
  console.log('Classification complete:', predictions);

  if (predictions && predictions.length > 0) {
    // Return the top prediction
    const topPrediction = predictions[0];
    return {
      label: topPrediction.className.split(', ')[0], // Take the primary class name
      confidence: topPrediction.probability,
    };
  } else {
    throw new Error('Could not classify the image.');
  }
};

// Pre-warm the model when the app loads
loadModel();
