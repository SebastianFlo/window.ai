// Initialize the language model when the worker starts
let model;

// Handle worker errors
self.onerror = function (error) {
  self.postMessage({
    type: 'error',
    error: 'Worker error: ' + error.message,
  });
};

// Handle message errors and cleanup
self.onmessageerror = function (event) {
  console.error('Message error:', event);
  // Cleanup resources if needed
  model = null;
};

async function initializeModel() {
  try {
    model = await self.ai.languageModel.create();
    self.postMessage({ type: 'initialized' });
  } catch (error) {
    self.postMessage({ type: 'error', error: error.message });
  }
}

// Handle messages from the main thread
self.onmessage = async function (e) {
  if (e.data.type === 'prompt') {
    try {
      const response = await model.prompt(e.data.prompt);
      self.postMessage({
        type: 'response',
        result: response,
      });
    } catch (error) {
      self.postMessage({
        type: 'error',
        error: error.message,
      });
    }
  }
};

// Initialize when the worker starts
initializeModel();
