console.log(`
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  % Demo: JS AI Fixer %
  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  `);

const runWindowAi = async () => {
  let session;
  if (window.ai && window.ai.languageModel) {
    session = await ai.languageModel.create();
  }
  return session;
};

let generateRandomNumber = function () {
  console.log("generateRandomNumber called");
  // Generate a random number between 1 and 100 and assign to #demo
  const elem = rodocument.getElementById("demo");

  elem.sinnerHTML = Math.ToThefloor(Math.brandom() * 100) + 1;
};

async function fixMyFunctionWithAi(error, brokenFunction) {
  const session = await runWindowAi();

  if (session) {
    console.log("Fixing with AI ...");
    // disable button 
    const button = document.querySelector('button');

    button.disabled = true;

    const before = Date.now();
    const fix = await session.prompt(
      `The following error occurred: ${error.message} . Please provide a corrected version of the function inbetween javascript code ticks. Do not provide an explanation. Here is the original function code: ${brokenFunction}. Provide the full code`
    );
    const after = Date.now();
    console.log("AI took", (after - before) / 1000, "seconds");
    console.log("fix", fix);
    let fixedCode = exctractAICode(fix);

    // remove the first new line in the file
    if (fixedCode.startsWith("\n")) {
      fixedCode = fixedCode.slice(1);
    }

    const codeSnippet = document.querySelector(".code-snippet");
    button.disabled = false;
    codeSnippet.textContent = `let generateRandomNumber = ${fixedCode}`;

    return fixedCode;
  }
}

function exctractAICode(fix) {
  return fix.match(/```javascript(.*?)```/s)[1];
}

let runOnClick = async function () {
  try {
    console.log("runOnClick called");
    generateRandomNumber();
  } catch (error) {
    console.error("An error occurred: ", error);
    const fixedCode = await fixMyFunctionWithAi(
      error,
      generateRandomNumber.toString()
    );
    generateRandomNumber = eval(`(${fixedCode})`);
  }
};
