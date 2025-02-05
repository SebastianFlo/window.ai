# window.ai Examples

This project provides a comprehensive set of examples demonstrating how to use the window.ai API, which is based on Google's Gemini Nano running in Chrome. These examples showcase various capabilities and patterns for integrating AI functionality into web applications and Chrome extensions.

## Overview

window.ai provides access to Gemini Nano directly in the browser, offering:

- In-browser AI capabilities
- Offline functionality
- Multiple AI APIs including Language Model, Translator, Language Detector, Summarizer, Writer, and Rewriter

## Setup Requirements

1. Install Chrome Canary or Chrome Beta
2. Configure Chrome flags:
   - Navigate to `chrome://flags`
   - Enable "Prompt API for Gemini Nano"
   - Enable "Enables optimization guide on device"
   - For some features, disable "chrome://flags/#text-safety-classifier"
3. Install the model:
   - Go to `chrome://components`
   - Find "Optimization Guide On Device Model"
   - Click "Check for Update" to install the model locally
4. Restart Chrome

## Usage

### Basic Initialization

```javascript
// For web applications
const aiNamespace = window.ai || self.ai; // WebWorkers

// For Chrome Extensions
const aiNamespace = chrome.aiOriginTrial || chrome.ai;

const languageModel = await aiNamespace.languageModel.create();
```

### Check Availability

```javascript
const capabilities = await ai.languageModel.capabilities();
console.log(capabilities.available);
// Returns:
// - "no": device/browser doesn't support language model
// - "after-download": supported but needs download
// - "readily": ready to use
```

## Examples

The project includes examples demonstrating:

1. **Basic Prompting** (`1-prompt/`)

   - Simple prompts
   - Streaming responses

2. **System Prompts** (`2-system-prompt/`)

   - Setting context
   - Role-based interactions

3. **Initial Prompts** (`3-initial-prompts/`)

   - Training with examples
   - Pattern recognition

4. **Custom Roles** (`4-custom-role/`)

   - Multi-user sessions
   - Role-based conversations

5. **Tools Integration** (`5-tools/`)

   - Calculator example
   - Tool usage patterns

6. **Temperature Control** (`6-temperature/`)

   - Adjusting creativity
   - Controlling response variance

7. **Session Management** (`7-persistance/`)

   - Session persistence
   - State management
   - Session cloning

8. **Session Control** (`8-destruction/`)
   - Aborting operations
   - Cleaning up resources

## Project Structure

```
.
├── 1-prompt/               # Basic prompting examples
├── 2-system-prompt/        # System prompt demonstrations
├── 3-initial-prompts/      # Example-based learning
├── 4-custom-role/          # Role-based interactions
├── 5-tools/                # Tool integration examples
├── 6-temperature/          # Response control
├── 7-persistance/          # Session management
├── 8-destruction/          # Resource cleanup
└── style.css              # Common styling
```

Each example includes:

- Interactive demonstrations
- Code snippets
- Visual flowcharts
- Practical use cases

## Best Practices

1. **Session Management**

   - Clone sessions when persistence isn't needed
   - Properly destroy sessions to free resources
   - Use streaming for long responses

2. **Response Control**

   - Adjust temperature for creativity vs precision
   - Use system prompts for consistent behavior
   - Leverage initial prompts for example-based learning

3. **Error Handling**
   - Check capabilities before usage
   - Handle stream interruptions
   - Manage session lifecycle

## Browser Compatibility

- Chrome Canary
- Chrome Beta
- Requires Gemini Nano support
- Some features may require specific flag configurations

## Notes

- Some features require disabling the text safety classifier
- Model download is required for first-time use
- Offline functionality available after initial setup
