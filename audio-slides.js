function main() {
  // Check if the browser supports the Web Speech API
  if (!('webkitSpeechRecognition' in window)) {
    console.log(
      'Your browser does not support the Web Speech API. Please use Chrome or another supported browser.'
    );
  } else {
    console.log('Initializing speech recognition...');
    // Initialize the speech recognition object
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true; // Keep listening even after a phrase is recognized
    recognition.interimResults = false; // Only final results are needed
    recognition.lang = 'en-US'; // Set the language

    // Variable to track the current slide

    // Start listening
    recognition.start();

    // Event listener for when speech is recognized
    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript
        .trim()
        .toLowerCase();
      // console.log("You said:", transcript);

      // Check if the transcript includes "next slide"
      if (
        transcript.includes('we go back') ||
        transcript.includes('previous slide')
      ) {
        console.log('You said to go back:', transcript);
        // use browser back navigation
        window.history.back();
        return;
      }

      if (
        transcript.includes('next slide') ||
        transcript.includes('move on') ||
        transcript.includes('moving on')
      ) {
        console.log('You said next slide:', transcript);
        // Perform the action (e.g., change the slide)
        // Look for next slide button on page. It's an anchor element containing this arrow: ➡️
        const allAnchors = document.querySelectorAll('a');

        const nextSlideButton = Array.from(allAnchors).find((element) =>
          element.textContent.includes('➡️')
        );

        if (!nextSlideButton) {
          console.log('Next slide button not found');
          return;
        }

        const nextSlidePath = nextSlideButton.href;
        console.log('Next slide path:', nextSlidePath);
        // Navigate to the next slide
        nextSlideButton.click();
      }
    };

    // Handle errors
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    // Restart recognition if it stops
    recognition.onend = () => {
      recognition.start();
    };
  }
}

// main();
